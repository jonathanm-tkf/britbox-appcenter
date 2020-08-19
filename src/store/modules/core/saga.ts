import { takeLatest, all, select, call, put } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import api from '@src/services/api';
import { CoreActionTypes, Menu } from './types';
import { AppState } from '../rootReducer';
import { menuRequestSuccess, menuRequestError } from './actions';

const getSegment = (state: AppState) => state.core.segment;

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

export function* init() {
  try {
    const segment = yield select(getSegment);
    const { response }: { response: Menu } = yield call(getMenu, segment);
    yield put(menuRequestSuccess(response));
  } catch (error) {
    yield put(menuRequestError());
  }
}

export default all([takeLatest(CoreActionTypes.PERSIST_REHYDRATE, init)]);
