import { takeLatest, all, select, call, put, takeEvery } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import api from '@src/services/api';
import { BritboxContentApi } from '@src/sdks';
import { CoreActionTypes, Menu, Segment } from './types';
import { AppState } from '../rootReducer';
import {
  menuRequestSuccess,
  menuRequestError,
  configRequestError,
  configRequestSuccess,
} from './actions';

const getSegment = (state: AppState) => state.core.segment || Segment.US;

export async function getMenu(segment: string) {
  try {
    const response = await api.get('/menu', {
      params: {
        segment,
      },
    });
    return { response: response.data };
  } catch (error) {
    return error;
  }
}

export async function getConfigSDK() {
  const { getLocation } = BritboxContentApi();

  try {
    const response = await getLocation();
    return { response };
  } catch (error) {
    return error;
  }
}

export function* getConfig() {
  try {
    const { response: config }: { response: { location: string } } = yield call(getConfigSDK);
    yield put(configRequestSuccess(config.location));
  } catch (error) {
    yield put(configRequestError());
  }
}

export function* init() {
  const segment = yield select(getSegment);

  yield call(getConfig);

  if (segment !== Segment.OUT) {
    try {
      const { response }: { response: Menu } = yield call(getMenu, segment);

      yield put(menuRequestSuccess(response));
    } catch (error) {
      yield put(menuRequestError());
    }
  }
}

export default all([
  takeLatest(CoreActionTypes.PERSIST_REHYDRATE, init),
  takeEvery(CoreActionTypes.CONFIG_REQUEST, getConfig),
]);
