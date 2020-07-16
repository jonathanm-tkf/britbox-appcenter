import { takeLatest, all } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import { CoreActionTypes } from './types';

export function* init() {
  return yield true;
}

export default all([takeLatest(CoreActionTypes.PERSIST_REHYDRATE, init)]);
