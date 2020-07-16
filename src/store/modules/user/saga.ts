import { takeLatest, all, call, put } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import { BritboxAccountApi } from '@src/sdks';
import { PayloadAction } from 'typesafe-actions';
import { UserActionTypes, UserLogin } from './types';
import { loginRequestFailure, loginRequestSuccess, loginRequestError } from './actions';

async function login({ user, password }: UserLogin) {
  const { authenticateCustomer } = new BritboxAccountApi.AuthorizationApi();

  try {
    // const response = await authenticateCustomer({
    //   contactUserName: 'maximilianor@takeoffmedia.com',
    //   contactPassword: '8Ub4cYAiM77EzJY',
    //   deviceDetails: {
    //     deviceType: 'android',
    //     deviceName: 'sony',
    //     serialNo: 'M7676273462',
    //   },
    // });
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
    } else {
      yield put(loginRequestError(response));
    }
  } catch (error) {
    // Sentry.captureException({ error, logger: 'user facebook' });
    yield put(loginRequestFailure());
  }
}

export default all([takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest)]);
