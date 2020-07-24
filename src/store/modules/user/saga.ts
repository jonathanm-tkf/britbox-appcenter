import { takeLatest, all, call, put, select } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import { BritboxAccountApi } from '@src/sdks';
import { PayloadAction } from 'typesafe-actions';
import { UserActionTypes, UserLogin, EvergentLoginResponse } from './types';
import {
  loginRequestFailure,
  loginRequestSuccess,
  loginRequestError,
  profileRequestSuccess,
} from './actions';
import { AppState } from '../rootReducer';

const getToken = (state: AppState) => state.user.access as EvergentLoginResponse;

async function profile(token: string) {
  const { getProfile } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await getProfile();
    return { response };
  } catch (error) {
    return error;
  }
}

async function login({ user, password }: UserLogin) {
  const { authenticateCustomer } = BritboxAccountApi();

  try {
    // TODO: Change devices data
    const response = await authenticateCustomer({
      contactUserName: user,
      contactPassword: password,
      deviceDetails: {
        deviceType: 'android',
        deviceName: 'sony',
        serialNo: 'M7676273462',
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export function* loginRequest({
  payload,
}: PayloadAction<UserActionTypes.LOGIN_REQUEST, UserLogin>) {
  try {
    const { response } = yield call(login, payload);
    if (Number(response.responseCode) === 1) {
      yield put(loginRequestSuccess(response));
      const { accessToken } = yield select(getToken);
      const { response: responseProfile } = yield call(profile, accessToken);
      yield put(profileRequestSuccess(responseProfile));
    } else {
      yield put(loginRequestError(response));
    }
  } catch (error) {
    // Sentry.captureException({ error, logger: 'user facebook' });
    yield put(loginRequestFailure());
  }
}

export default all([takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest)]);
