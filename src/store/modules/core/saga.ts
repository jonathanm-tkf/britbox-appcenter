/* eslint-disable no-plusplus */
import { takeLatest, all, select, call, put, takeEvery, delay } from 'redux-saga/effects';
import axios from 'axios';
import api from '@src/services/api';
import { BritboxContentApi } from '@src/sdks';
import { Config } from '@src/utils/config';
import { CoreActionTypes, Menu, Segment } from './types';
import {
  menuRequestSuccess,
  menuRequestError,
  configRequestError,
  configRequestSuccess,
  britBoxAppConfigSuccess,
} from './actions';
import { errorConfig, finishedConfiguration, retryTimes } from '../layout/actions';
import { homeRequest } from '../home/saga';

const getSegment = (state: { core: { segment: any } }) => state.core.segment || Segment.US;

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
    // yield put(configRequestSuccess('us'));
  }
}

export async function getBritBoxAppConfig() {
  try {
    const response = await axios.get(`${Config.CONFIG_URL}britbox-app-config.json`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export function* getConfiguration() {
  for (let i = 1; i <= 3; i++) {
    try {
      const config = yield call(getBritBoxAppConfig);
      return config;
    } catch (err) {
      if (i < 3) {
        yield put(retryTimes());
        yield delay(1000);
      }
    }
  }
  // attempts failed after 5x2secs
  throw new Error('Get configuration not fulfilled. Giving up.');
}

export function* init() {
  try {
    const config = yield call(getConfiguration);
    yield put(britBoxAppConfigSuccess(config));

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

    yield call(homeRequest);

    yield put(finishedConfiguration());
  } catch (error) {
    yield put(errorConfig());
  }
}

export default all([
  takeLatest(CoreActionTypes.PERSIST_REHYDRATE, init),
  takeEvery(CoreActionTypes.CONFIG_REQUEST, getConfig),
]);
