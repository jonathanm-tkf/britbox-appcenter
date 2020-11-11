import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Content.TS/api';
import { Action } from 'redux';
import axios from 'axios';
import { getImage } from '@src/utils/images';
import { getDevice } from '@src/utils';
import { BritboxAccountApi } from '@src/sdks';
import GoogleCast from 'react-native-google-cast';
import { Config } from '@src/utils/config';
import {
  Connection,
  DataResponseMediaSlector,
  LayoutState,
  Subtitles,
} from '@store/modules/layout/types';
import { pickBy, shuffle } from 'lodash';
import { Platform } from 'react-native';
import { getSystemVersion } from 'react-native-device-info';
import { getUserId } from '@src/services/analytics';
import sha1 from 'sha1';
import { refreshTokenWithExpiresIn } from '@src/services/token';
import { Segment } from '../core/types';
import { ChromecastActionTypes } from './types';
import { AppState } from '../rootReducer';
import { EvergentLoginResponse, UserState } from '../user/types';
import { castVideoPlayerDetailClear, setCastState } from '../layout/actions';
import { refreshTokenSuccess } from '../user/actions';

const getRefreshToken = (state: AppState) => state.user.access as EvergentLoginResponse;
const getExiresIn = (state: AppState) => state.user.access as EvergentLoginResponse;
const getUserState = (state: AppState) => state.user;
const getLayoutState = (state: AppState) => state.layout as LayoutState;
const getSegment = (state: AppState) => state.core.segment;
const getToken = (state: AppState) => state.user.access as EvergentLoginResponse;
const getWatched = (state: AppState) => state.detail?.watched || {};

const getProgress = (id: string, watched: any) => {
  const filter = pickBy(watched, (value, key) => key.startsWith(id || ''));
  if (filter[id || '']) {
    const { isFullyWatched, position } = filter[id || ''];

    if (isFullyWatched) {
      return 0;
    }

    return position;
  }

  return 0;
};

const getUser = async (
  userState: UserState,
  layoutState: LayoutState,
  token: string,
  segment: Segment
) => {
  const { user } = getUserId(token);

  return {
    token,
    ert: userState?.access?.refreshToken || '',
    user_id: user,
    platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
    device_name: layoutState.device,
    country: segment,
    os_version: getSystemVersion(),
    expiresIn: userState?.access?.expiresIn || '',
    analyticsSubscriptionStatus: userState?.profile?.analyticsSubscriptionStatus || '',
    staging: true,
  };
};

interface CastVideoSagaType extends Action {
  payload: {
    item: MassiveSDKModelEpisodesItem;
    pcToken?: string;
    playPosition: number | boolean;
  };
}

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

export const castVideoRequest = async (
  userState: UserState,
  layoutState: LayoutState,
  segment: Segment,
  token: string,
  connection: string,
  watched: any,
  item: MassiveSDKModelEpisodesItem,
  pcToken?: string,
  playPosition: number | boolean = false
) => {
  const { getItemMediaFiles } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const params: any = {
    device: getDevice(),
    segments: [segment],
    sub: 'Subscriber',
  };

  if (pcToken !== '') {
    params.pcToken = pcToken;
  }
  const response = await getItemMediaFiles(item?.id || '0', params)
    .then((tokenInformation) => tokenInformation)
    .catch(() => {
      throw new Error('Error with getItemMediaFiles');
    });

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
      .catch((error) => error);

    const { href: subtitles } = await parseResponseMediaSelectorSubtitles(
      responseMediaSelector.data
    ).then((subs) => subs);

    const user = await getUser(userState, layoutState, token, segment);

    return parseResponseMediaSelector(responseMediaSelector.data).then((dataVideo) => {
      const video = {
        title: item?.contextualTitle || '',
        subtitle: item?.shortDescription || '',
        mediaUrl: dataVideo.href,
        imageUrl: getImage(item?.images?.wallpaper, 'wallpaper'),
        duration: item?.duration || 0,
        posterUrl: getImage(item?.images?.square, 'wallpaper'),
        playPosition: playPosition || getProgress(item?.id || '', watched),
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
      return { video };
    });
  }

  return false;
};

export function* castVideoSaga({ payload: { item, pcToken, playPosition } }: CastVideoSagaType) {
  try {
    const segment = yield select(getSegment);
    const { expiresIn } = yield select(getExiresIn);
    const { accessToken } = yield select(getToken);
    const { refreshToken: refreshTokenState } = yield select(getRefreshToken);
    const { response: responseRefreshToken } = yield call(
      refreshTokenWithExpiresIn,
      expiresIn,
      refreshTokenState
    );
    let token = accessToken;
    if (responseRefreshToken) {
      yield put(refreshTokenSuccess(responseRefreshToken));
      token = responseRefreshToken.accessToken;
    }
    const watched = yield select(getWatched);
    const userState = yield select(getUserState);
    const layoutState = yield select(getLayoutState);
    const { video } = yield call(
      castVideoRequest,
      userState,
      layoutState,
      segment,
      token,
      layoutState.connection,
      watched,
      item,
      pcToken,
      playPosition
    );

    let retry = 1;
    const timer = setInterval(() => {
      return GoogleCast.getCastDevice()
        .then((device) => {
          if (retry === 20) {
            clearInterval(timer);
            throw new Error('Retry');
          }
          if (device) {
            clearInterval(timer);
            GoogleCast.castMedia(video);
          } else {
            retry += 1;
          }
        })
        .catch(() => {});
    }, 500);
  } catch (error) {
    yield put(castVideoPlayerDetailClear());
    yield put(setCastState('error'));
  }
}

export default all([takeLatest(ChromecastActionTypes.CAST_VIDEO, castVideoSaga)]);
