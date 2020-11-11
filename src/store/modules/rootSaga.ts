/* eslint-disable import/no-cycle */
import { all } from 'redux-saga/effects';
import core from './core/saga';
import user from './user/saga';
import home from './home/saga';
import chromecast from './chromecast/saga';

export default function* rootSaga() {
  return yield all([core, user, home, chromecast]);
}
