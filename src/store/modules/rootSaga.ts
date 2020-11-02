import { all } from 'redux-saga/effects';
import core from './core/saga';
import user, { watchProfilePollSaga } from './user/saga';
import home from './home/saga';

export default function* rootSaga() {
  return yield all([core, user, home, watchProfilePollSaga()]);
}
