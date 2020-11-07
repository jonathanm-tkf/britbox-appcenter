import { takeLatest, all, call, put, select } from 'redux-saga/effects';

import { BritboxContentApi } from '@src/sdks';
import { getDevice } from '@src/utils';
import { isTablet } from 'react-native-device-info';
import { Config } from '@src/utils/config';
import { loadCollectionList } from '@src/services/util';
import {
  homeRequestSuccess,
  homeRequestError,
  searchRequestSuccess,
  searchRequestError,
} from './actions';
import { AppState } from '../rootReducer';
import { HomeActionTypes } from './types';
import { configRequestError, configRequestSuccess } from '../core/actions';
import { Segment } from '../core/types';

const getSegment = (state: AppState) => state.core.segment;

export async function getConfigSDK() {
  const { getLocation } = BritboxContentApi();

  try {
    const response = await getLocation();
    return { response };
  } catch (error) {
    return error;
  }
}

async function getHomeData(segment: string) {
  const { getPage } = BritboxContentApi();

  try {
    const response = await getPage({
      path: '/',
      device: getDevice(),
      listPageSize: 18,
      maxListPrefetch: 15,
      segments: [segment],
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
    const segment = yield select(getSegment);
    const { response } = yield call(getHomeData, segment);

    yield put(homeRequestSuccess(response));
  } catch (error) {
    yield put(homeRequestError(error));
  }
}

async function getSearchData(segment: string) {
  try {
    const { response } = await loadCollectionList(
      {
        id: Config.SEARCH_LIST,
        page: 1,
        pageSize: isTablet() ? 8 : 6,
        sub: 'Subscriber',
      },
      segment
    );
    return { response };
  } catch (error) {
    return error;
  }
}

export function* searchRequest() {
  try {
    const segment = yield select(getSegment);
    const { response } = yield call(getSearchData, segment);
    yield put(searchRequestSuccess(response));
  } catch (error) {
    yield put(searchRequestError());
  }
}

export async function getItemContent(id: string) {
  const { getItem } = BritboxContentApi();

  try {
    const response = await getItem(id, {
      useCustomId: true,
    });

    return response;
  } catch (error) {
    return error;
  }
}

export function* activateApp() {
  try {
    const segment = yield select(getSegment);
    const { response: config }: { response: { location: string } } = yield call(getConfigSDK);
    yield put(configRequestSuccess(config.location));
    const { response } = yield call(getHomeData, config.location);
    const { response: responseSearch } = yield call(getSearchData, segment);
    if (config.location !== Segment.OUT) {
      yield put(homeRequestSuccess(response));
      yield put(searchRequestSuccess(responseSearch));
    }
  } catch (error) {
    yield put(configRequestError());
    yield put(homeRequestError(error));
    yield put(searchRequestError());
  }
}

export default all([
  takeLatest(HomeActionTypes.HOME_REQUEST, homeRequest),
  takeLatest(HomeActionTypes.HOME_SEARCH, searchRequest),
  takeLatest(HomeActionTypes.HOME_ACTIVATE_APP, activateApp),
]);
