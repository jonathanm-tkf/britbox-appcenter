import { takeLatest, all, call, put, select } from 'redux-saga/effects';
// import * as Sentry from '@sentry/react-native';

import { BritboxAccountApi, BritboxContentApi } from '@src/sdks';
import {
  BritboxAPIAccountModelsCustomerAddSubscriptionRequest,
  BritboxAPIAccountModelsProfileUpdateProfileRequest,
  BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest,
  BritboxAPIAccountModelsProfileResetPasswordRequest,
  BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest,
} from '@src/sdks/Britbox.API.Account.TS/api';
import { PayloadAction } from 'typesafe-actions';
import { UserActionTypes, UserLogin, EvergentLoginResponse, UserSignUp } from './types';
import {
  loginRequestFailure,
  loginRequestSuccess,
  loginRequestError,
  profileRequestSuccess,
} from './actions';
import { AppState } from '../rootReducer';

const getToken = (state: AppState) => state.user.access as EvergentLoginResponse;

export async function profile(token: string) {
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

export async function getAccountDetail(token: string) {
  const { getAccountDetails } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await getAccountDetails();
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
      const { response: responseAccountDetail } = yield call(getAccountDetail, accessToken);
      yield put(profileRequestSuccess({ ...responseProfile, ...responseAccountDetail }));
    } else {
      yield put(loginRequestError(response));
    }
  } catch (error) {
    // Sentry.captureException({ error, logger: 'user facebook' });
    yield put(loginRequestFailure());
  }
}

async function signup({
  firstName,
  lastName,
  email,
  password,
  alertNotificationEmail,
}: UserSignUp) {
  const { register } = BritboxAccountApi();

  try {
    const response = await register({
      firstName,
      lastName,
      email,
      customerPassword: password,
      country: 'US',
      alertNotificationEmail,
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

export async function signupRequest(payload: UserSignUp) {
  try {
    const response = await signup(payload);
    return response;
  } catch (error) {
    // Sentry.captureException({ error, logger: 'signup error' });
    return null;
  }
}

export async function forgotPasswordRequest(
  forgotPasswordParams: BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest
) {
  const { forgotContactPassword } = BritboxAccountApi();

  try {
    const response = await forgotContactPassword(forgotPasswordParams);

    return response;
  } catch (error) {
    return error;
  }
}

export async function getProductsRequest() {
  const { getProducts } = BritboxAccountApi();

  try {
    const response = await getProducts({
      countryCode: 'US',
      returnAppChannels: 'T',
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function addSubscriptionRequest(
  accessToken: string,
  addSubscriptionRequestObject: BritboxAPIAccountModelsCustomerAddSubscriptionRequest
) {
  const { addSubscription } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  try {
    const response = await addSubscription(addSubscriptionRequestObject);

    return response;
  } catch (error) {
    return error;
  }
}

export function* getProfileRequest() {
  try {
    const { accessToken } = yield select(getToken);
    const { response: responseProfile } = yield call(profile, accessToken);
    const { response: responseAccountDetail } = yield call(getAccountDetail, accessToken);
    yield put(profileRequestSuccess({ ...responseProfile, ...responseAccountDetail }));
  } catch (error) {
    // Sentry.captureException({ error, logger: 'user get profile' });
  }
}

export async function updateProfileRequest(
  accessToken: string,
  updateProfileParams: BritboxAPIAccountModelsProfileUpdateProfileRequest
) {
  const { updateProfile } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  try {
    const response = await updateProfile(updateProfileParams);

    return response;
  } catch (error) {
    return error;
  }
}

export async function resetPasswordRequest(
  accessToken: string,
  resetPasswordParams: BritboxAPIAccountModelsProfileResetPasswordRequest
) {
  const { resetPassword } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  try {
    const response = await resetPassword(resetPasswordParams);

    return response;
  } catch (error) {
    return error;
  }
}

export async function validateContactPasswordRequest(accessToken: string, contactPassword: string) {
  const { validateContactPassword } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  try {
    const response = await validateContactPassword({
      contactPassword,
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function getParentalControlDetail(accessToken: string) {
  const { getParentalControlDetails } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await getParentalControlDetails();

    return response;
  } catch (error) {
    return error;
  }
}

export async function updateParentalControlDetailsRequest(
  accessToken: string,
  updateParentalControlParams: BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest
) {
  const { updateParentalControlDetails } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  try {
    const response = await updateParentalControlDetails(updateParentalControlParams);

    return response;
  } catch (error) {
    return error;
  }
}

export async function getConfigRequest() {
  const { getConfig } = BritboxContentApi();

  try {
    const response = await getConfig({
      segments: 'us',
      include: [
        'classification',
        'playback',
        'sitemap',
        'navigation',
        'subscription',
        'general',
        'display',
        'i18n',
        'linear',
      ],
    });

    return { response };
  } catch (error) {
    return error;
  }
}

export default all([
  takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest),
  takeLatest(UserActionTypes.GET_PROFILE_REQUEST, getProfileRequest),
]);
