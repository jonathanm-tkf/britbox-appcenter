import { all } from 'redux-saga/effects';
import core from './core/saga';
import user from './user/saga';

export default function* rootSaga() {
  return yield all([core, user]);
}
