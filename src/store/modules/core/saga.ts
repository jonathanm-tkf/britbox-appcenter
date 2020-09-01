import { takeLatest, all, select, call, put } from 'redux-saga/effects';
import axios from 'axios';
// import * as Sentry from '@sentry/react-native';

import api from '@src/services/api';
import Constants from '@src/config/Constants';
import { BritboxContentApi } from '@src/sdks';
import { CoreActionTypes, Menu, Segment } from './types';
import { AppState } from '../rootReducer';
import {
  menuRequestSuccess,
  menuRequestError,
  configRequestError,
  configRequestSuccess,
  britBoxAppConfigSuccess,
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

export async function getBritBoxAppConfig() {
  try {
    const response = await axios.get(`${Constants.config_url}britbox-app-config.json`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function* init() {
  try {
    const segment = yield select(getSegment);
    const { response }: { response: Menu } = yield call(getMenu, segment);

    yield put(menuRequestSuccess(response));

    const config = yield call(getBritBoxAppConfig);
    yield put(britBoxAppConfigSuccess(config));
  } catch (error) {
    yield put(menuRequestError());
  }

  try {
    const { response: config }: { response: { location: string } } = yield call(getConfigSDK);
    yield put(configRequestSuccess(config.location));
  } catch (error) {
    yield put(configRequestError());
  }
}

export default all([takeLatest(CoreActionTypes.PERSIST_REHYDRATE, init)]);
