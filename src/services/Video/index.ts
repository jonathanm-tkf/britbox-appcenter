import { BritboxAccountApi, BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { getImage } from '@src/utils/images';
import { CoreState } from '@store/modules/core/types';
import { LayoutState } from '@store/modules/layout/types';
import axios from 'axios';
import { store } from '@store/index';
import { encode } from 'base-64';
import { Platform } from 'react-native';
import { shuffle } from 'lodash';
import { URL } from 'react-native-url-polyfill';
import sha1 from 'sha1';
import { BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse } from '@src/sdks/Britbox.API.Account.TS/api';
import { MassiveSDKModelItemSummary } from '@src/sdks/Britbox.API.Content.TS/api';
import { Config } from '@src/utils/config';
import { Connection, MediaSelectorResponse, Protocol, TransferFormat, CustomData } from './types';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment;
};

const getToken = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.token;
};

const getConnection = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.connection;
};

const parseResponseMediaSelectorSubtitles = (
  data: MediaSelectorResponse
): Promise<{ href: string | undefined }> => {
  return new Promise((resolve, reject) => {
    try {
      const { media } = data;
      const captions = media.filter((m) => m.kind === 'captions');
      if (captions && captions.length > 0) {
        const { connection } = captions.reduce((v) => v);
        const items = connection.filter((c) => c.protocol === Protocol.HTTPS);
        if (items.length > 0) {
          resolve(items.reduce((captionItem) => captionItem));
        }
      }
      resolve({ href: undefined });
    } catch (error) {
      reject('parseResponseMediaSelectorSubtitles');
    }
  });
};

const parseResponseMediaSelector = ({ media }: MediaSelectorResponse): Promise<Connection> => {
  return new Promise((resolve, reject) => {
    try {
      const video = media.filter((m) => m.kind === 'video');
      if (video) {
        const { connection } = video.reduce((v) => v);
        const items = connection.filter(
          (c) =>
            c.protocol === Protocol.HTTPS &&
            c.transferFormat === (Platform.OS === 'ios' ? TransferFormat.HLS : TransferFormat.DASH)
        );
        if (items.length > 0) {
          resolve(shuffle(items).reduce((videoItem) => videoItem));
        }
      }
      reject({
        devMessage: 'parseResponseMediaSelector video not found',
        errorCode: '70.001',
      });
    } catch (error) {
      reject({
        devMessage: 'parseResponseMediaSelector',
        errorCode: '70.002',
      });
    }
  });
};

const thumbnailsMediaSelector = ({ media }: MediaSelectorResponse): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    let finalThumbsUrl;
    try {
      const thumbnailsFilter = media.filter((m) => m.kind === 'thumbnails')[0];
      if (thumbnailsFilter) {
        const thumbnails = thumbnailsFilter.connection;
        const thumbnailUrlList = thumbnails.filter(
          (thumbnail) => thumbnail.protocol === Protocol.HTTPS
        );
        const thumbnailUrl =
          thumbnailUrlList[Math.floor(Math.random() * thumbnailUrlList.length)].href;
        const parsedUrl = new URL(thumbnailUrl);
        const base64path = encode(parsedUrl.pathname);
        const base64queryString = encode(parsedUrl.search);
        finalThumbsUrl = `${Config.THUMBNAILS_MEDIA_SELECTOR}?qs=${base64queryString}&fn=${base64path}&ch=${parsedUrl.hostname}`;
      }
    } catch (error) {
      reject({
        devMessage: 'thumbnailsMediaSelector',
        errorCode: '70.003',
      });
    }
    resolve(finalThumbsUrl);
  });
};

type MediaFiles = {
  device: 'tablet_android' | 'tablet_iOS' | 'phone_android' | 'phone_iOS';
  segments: string[];
  sub: string;
  pcToken?: string;
};

export const videoRequest = async (
  segment: string,
  token: string,
  connection: string,
  item: MassiveSDKModelItemSummary,
  pcToken?: string
) => {
  const { getItemMediaFiles } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { getItem } = BritboxContentApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const params: MediaFiles = {
    device: getDevice(),
    segments: [segment],
    sub: 'Subscriber',
  };

  if (pcToken !== '') {
    params.pcToken = pcToken;
  }

  const response = await getItemMediaFiles(item?.id || '0', params)
    .then(
      (tokenInformation: BritboxAPIAccountModelsMediaFileGetItemMediaFilesResponse) =>
        tokenInformation
    )
    .catch(() =>
      Promise.reject({
        devMessage: 'getItemMediaFiles',
        errorCode: '70.004',
      })
    );

  if (response) {
    const { token: tokenMediaSelector, url } = (response?.externalResponse || [])?.reduce(
      (external) => external
    );

    const videoTokenParameter = `?saml_auth=${tokenMediaSelector}`;

    const idToHash = `7dff7671d0c697fedb1d905d9a121719938b92bf${url}`;
    const mediaSelectoUrl = `${
      Config.MEDIA_SELECTOR_HOST
    }/mediaselector/6/select/version/2.0/mediaset/${connection}/vpid/${url}/format/json/atk/${sha1(
      idToHash
    )}/asn/1/jsfunc${videoTokenParameter}`;

    const responseMediaSelector = await axios
      .get(mediaSelectoUrl)
      .then((media) => media)
      .catch(() => Promise.reject({ devMessage: 'responseMediaSelector', errorCode: '70.005' }));

    const { href: subtitles } = await parseResponseMediaSelectorSubtitles(
      responseMediaSelector.data
    ).then((subs) => subs);

    const itemDetail = await getItem(item?.id || '0', {
      segments: [segment],
    })
      .then((i) => i.externalResponse)
      .catch(() => Promise.reject({ devMessage: 'getItemDetail', errorCode: '70.006' }));

    const thumbnails = await thumbnailsMediaSelector(responseMediaSelector.data).then(
      (data) => data
    );

    return parseResponseMediaSelector(responseMediaSelector.data).then(
      async (dataVideo: Connection) => {
        const customData: CustomData = {
          media: {
            itemVideoCustomId: url,
            itemVideoMassiveId: item?.id,
            itemVideoTitle: item?.title,
          },
        };

        if (thumbnails) {
          customData.thumbnails = thumbnails;
        }

        if (subtitles) {
          const urlBase64 = encode(subtitles);
          const subtitlesUrl = `${Config.SUBTITLES}/v1/subtitles?qs=${urlBase64}`;
          customData.subtitles = subtitlesUrl;
        }

        const video = {
          title: item?.contextualTitle || '',
          subtitle: item?.shortDescription || '',
          mediaUrl: dataVideo.href,
          imageUrl: getImage(itemDetail?.images?.wallpaper, 'wallpaper'),
          posterUrl: getImage(itemDetail?.images?.square, 'wallpaper'),
          customData,
        };

        return { video };
      }
    );
  }

  return Promise.reject({ devMessage: 'Error: response', errorCode: '70.007' });
};

type PlayerVideoData = {
  item: MassiveSDKModelItemSummary;
  isTrailer: boolean;
  pcToken?: string;
  currentTime: number;
};

export const PlayVideo = async ({ item, pcToken }: PlayerVideoData) => {
  try {
    const segment = getSegment();
    const { video } = await videoRequest(
      segment,
      getToken(),
      getConnection() || 'mobile-phone-main',
      item,
      pcToken
    );
    return { video };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNextItem = async (id: string) => {
  const { getNextPlaybackItem } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const response = await getNextPlaybackItem(id, {
    segments: [getSegment()],
    expand: 'parent',
  });
  return response.externalResponse;
};
