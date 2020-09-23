/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { BritboxAccountApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { store } from '@store/index';
import { CoreState } from '@store/modules/core/types';
import { UserState } from '@store/modules/user/types';
import Constants from '@src/config/Constants';
import {
  LayoutState,
  DataResponseMediaSlector,
  Connection,
  Subtitles,
} from '@store/modules/layout/types';
import axios from 'axios';
import sha1 from 'sha1';
import GoogleCast from 'react-native-google-cast';
import { getImage } from '@src/utils/images';
import { Platform } from 'react-native';
import { shuffle } from 'lodash';
import { getSystemVersion } from 'react-native-device-info';
import { getUserId } from './analytics';

const getSegment = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.segment;
};

const getToken = () => {
  const { core }: { core: CoreState } = store.getState();
  return core.token;
};

const getUser = async () => {
  const { user: userState }: { user: UserState } = store.getState();
  const { layout }: { layout: LayoutState } = store.getState();
  const { user } = getUserId(getToken());

  return {
    token: getToken(),
    ert: userState?.access?.refreshToken || '',
    user_id: user,
    platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
    device_name: layout.device,
    country: getSegment(),
    os_version: getSystemVersion(),
    expiresIn: userState?.access?.expiresIn || '',
    analyticsSubscriptionStatus: userState?.profile?.analyticsSubscriptionStatus || '',
    staging: true,
  };
};

const getConnection = () => {
  const { layout }: { layout: LayoutState } = store.getState();
  return layout.connection;
};

const parseResponseMediaSelector = (data: DataResponseMediaSlector) => {
  return new Promise<Connection>((resolve) => {
    const { media } = data;

    const video = media.filter((m) => m.kind === 'video');

    if (video) {
      const { connection } = video.reduce((v) => v);
      const items = connection.filter(
        (c) =>
          c.protocol === 'https' && c.transferFormat === (Platform.OS === 'ios' ? 'hls' : 'dash')
      );

      if (items.length > 0) {
        const videos = shuffle(items);

        resolve(videos.reduce((videoItem) => videoItem));
      }
    }
  });
};

const parseResponseMediaSelectorSubtitles = (data: DataResponseMediaSlector) => {
  return new Promise<Subtitles>((resolve) => {
    const { media } = data;

    const captions = media.filter((m) => m.kind === 'captions');

    if (captions) {
      const { connection } = captions.reduce((v) => v);
      const items = connection.filter((c) => c.protocol === 'https');

      if (items.length > 0) {
        resolve(items.reduce((captionItem) => captionItem));
      }
    }
  });
};

export const CastVideo = async (item: MassiveSDKModelEpisodesItem) => {
  const { getItemMediaFiles } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  try {
    const response = await getItemMediaFiles(item?.id || '0', {
      device: getDevice(),
      segments: [getSegment()],
      sub: 'Subscriber',
    });

    if (response) {
      const { token, url } = (response?.externalResponse || [])?.reduce((external) => external);

      const videoTokenParameter = `?saml_auth=${token}`;

      const idToHash = `7dff7671d0c697fedb1d905d9a121719938b92bf${url}`;
      const mediaSelectoUrl = `${
        Constants.mediaSelectorHost
      }/mediaselector/6/select/version/2.0/mediaset/${getConnection()}/vpid/${url}/format/json/atk/${sha1(
        idToHash
      )}/asn/1/jsfunc${videoTokenParameter}`;

      const responseMediaSelector = await axios.get(mediaSelectoUrl);

      const { href: subtitles } = await parseResponseMediaSelectorSubtitles(
        responseMediaSelector.data
      ).then((subs) => subs);

      const user = await getUser();

      parseResponseMediaSelector(responseMediaSelector.data).then((dataVideo) => {
        const video = {
          title: item?.contextualTitle || '',
          subtitle: item?.shortDescription || '',
          mediaUrl: dataVideo.href,
          imageUrl: getImage(item?.images?.wallpaper, 'wallpaper'),
          duration: item?.duration || 0,
          posterUrl: getImage(item?.images?.square, 'wallpaper'),
          customData: {
            user,
            media: {
              itemVideoCustomId: url,
              itemVideoMassiveId: item?.id,
              itemVideoTitle: item?.title,
            },
            subtitles,
          },
        };

        GoogleCast.getCastDevice().then((device) => {
          if (device) {
            // GoogleCast.initChannel('urn:x-cast:com.reactnative.googlecast.britbox');
            GoogleCast.castMedia(video);
            GoogleCast.launchExpandedControls();
          }
        });
      });
    }

    // const videoUrl =
    //   'http://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/DesigningForGoogleCast.mp4';
    // const video = {
    //   title: item?.contextualTitle || '',
    //   subtitle: item?.shortDescription || '',
    //   mediaUrl: videoUrl,
    //   imageUrl: getImage(item?.images?.wallpaper, 'wallpaper'),
    //   duration: item?.duration || 0,
    //   posterUrl: getImage(item?.images?.square, 'wallpaper'),
    // };

    // GoogleCast.getCastDevice().then((device) => {
    //   if (device) {
    //     // GoogleCast.initChannel('urn:x-cast:com.reactnative.googlecast.britbox');
    //     GoogleCast.castMedia(video);
    //     GoogleCast.launchExpandedControls();
    //   }
    // });

    return true;
  } catch (error) {
    return error;
  }
};
