import { takeLatest, all, call, put } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import { BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { HomeActionTypes } from './types';
import { homeRequestSuccess, homeRequestError } from './actions';
// import { AppState } from '../rootReducer';

type HomeDataRequest = {
  path?: string;
  useCustomId?: boolean;
  listPageSize?: number;
  listPageSizeLarge?: number;
  maxListPrefetch?: number;
  itemDetailExpand?: string;
  itemDetailSelectSeason?: string;
  textEntryFormat?: string;
  maxRating?: string;
  device?: string;
  sub?: string;
  segments?: string[];
};

async function getHomeData() {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path: '/',
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: ['US'],
      sub: 'Subscriber',
      useCustomId: true,
    });

    return { response };
  } catch (error) {
    return error;
  }
}

export function* homeRequest() {
  try {
    const { response } = yield call(getHomeData);
    yield put(homeRequestSuccess(response));
  } catch (error) {
    // Sentry.captureException({ error, logger: 'user facebook' });
    yield put(homeRequestError(error));
  }
}

export default all([takeLatest(HomeActionTypes.HOME_REQUEST, homeRequest)]);
