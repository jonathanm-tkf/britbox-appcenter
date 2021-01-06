/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  takeLatest,
  all,
  call,
  put,
  select,
  takeEvery,
  race,
  take,
  delay,
} from 'redux-saga/effects';
/// import Analytics from 'appcenter-analytics';
import { BritboxAccountApi, BritboxContentApi } from '@src/sdks';
import {
  BritboxAPIAccountModelsCustomerAddSubscriptionRequest,
  BritboxAPIAccountModelsProfileUpdateProfileRequest,
  BritboxAPIAccountModelsProfileUpdateParentalControlDetailsRequest,
  BritboxAPIAccountModelsProfileResetPasswordRequest,
  BritboxAPIAccountModelsProfileGetProfileResponse,
  BritboxAPIAccountModelsAuthorizationForgotContactPasswordRequest,
} from '@src/sdks/Britbox.API.Account.TS/api';
import { PayloadAction } from 'typesafe-actions';
import { refreshTokenWithExpiresIn } from '@src/services/token';
import { navigationGoBack } from '@src/navigation/rootNavigation';
import { getDeviceName, getUniqueId } from 'react-native-device-info';
import { Platform, NativeModules } from 'react-native';
import {
  loggedInRequest as loggedInRequestSuccess,
  loginRequestFailure,
  loginRequestSuccess,
  loginRequestError,
  profileRequestSuccess,
  logoutSuccess,
  watchlistRequestAdd,
  watchlistRequestRemove,
  refreshTokenSuccess,
  continueWatchingRemoveRequestSuccess,
  continueWatchingRequestError,
  continueWatchingRequestSuccess,
  pollingProfileCancelled,
} from '@store/modules/user/actions';
import {
  sendAppleTvSearchSubscription,
  revokeAppleTvSearchSubscription,
  retryClear,
} from '@store/modules/core/actions';
import { getDevice } from '@src/utils';

import { analyticsRef } from '@src/utils/analytics';
import { welcomeMessageOn, getProfileFailed } from '../layout/actions';
import {
  UserActionTypes,
  UserLogin,
  EvergentLoginResponse,
  UserSignUp,
  WatchListItem,
  ContinueWatchingItem,
} from './types';
import { AppState } from '../rootReducer';

const { AppleTVController } = NativeModules;

const getToken = (state: AppState) => state.user.access as EvergentLoginResponse;
const getSegment = (state: AppState) => state.core.segment;
const getIsLogged = (state: AppState) => state.user.isLogged;
const getRetryTimes = (state: AppState) => state.core.retry;

const getExiresIn = (state: AppState) => state.user.access as EvergentLoginResponse;

const getRefreshToken = (state: AppState) => state.user.access as EvergentLoginResponse;

const getIsAppleTVSearchSubscriptionSent = (state: AppState) =>
  state.core.isAppleTVSearchSubscriptionSent;

export async function profile(
  token: string,
  segment?: string
): Promise<{ response: BritboxAPIAccountModelsProfileGetProfileResponse }> {
  const { getProfileV2 } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await getProfileV2({
      useCustomId: true,
      segments: [segment || ''],
    }).catch((error) => {
      throw new Error('Error Profile');
    });

    return { response };
  } catch (error) {
    throw new Error('Error Profile');
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
    const deviceName = await getDeviceName().then((name) => name);

    const response = await authenticateCustomer({
      contactUserName: user,
      contactPassword: password,
      deviceDetails: {
        deviceName,
        deviceType: Platform.OS,
        serialNo: getUniqueId(),
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
      if (analyticsRef.current) {
        analyticsRef.current.onTrackEvent({
          type: 'event',
          actionType: 'auth',
          actionName: 'bb_logged_in',
          eventProperties: {
            is_background: false,
            container: 'Application',
            result: '',
            source: 'Britbox~App',
            metadata: '',
            eventType: 'atc',
            label: 'User has logged in',
            status: 'success',
          },
        });
      }
      const { accessToken } = yield select(getToken);
      const segment = yield select(getSegment);
      const { response: responseProfile } = yield call(profile, accessToken, segment);
      const { response: responseAccountDetail } = yield call(getAccountDetail, accessToken);
      yield put(profileRequestSuccess({ ...responseProfile, ...responseAccountDetail }));
      if (responseProfile.canStream) {
        yield call(appleTVSubscription);
      }
    } else {
      yield put(loginRequestError(response));
      if (analyticsRef.current) {
        analyticsRef.current.onTrackEvent({
          type: 'event',
          actionType: 'error',
          actionName: 'bb_logged_in',
          eventProperties: {
            is_background: false,
            container: 'Application',
            result: `${response?.failureMessage[0]?.errorCode}: ${response?.failureMessage[0]?.errorMessage}`,
            source: 'Britbox~App',
            metadata: '',
          },
        });
      }
    }
  } catch (error) {
    Analytics.trackEvent('loginRequestFailure', {
      error: JSON.stringify(error),
    });
    yield put(loginRequestFailure());
  }
}

async function signup(
  { firstName, lastName, email, password, alertNotificationEmail }: UserSignUp,
  country: string
) {
  const { register } = BritboxAccountApi();
  const deviceName = await getDeviceName().then((name) => name);

  try {
    const response = await register({
      firstName,
      lastName,
      email,
      customerPassword: password,
      country,
      alertNotificationEmail,
      deviceDetails: {
        deviceName,
        deviceType: Platform.OS,
        serialNo: getUniqueId(),
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function signupRequest(payload: UserSignUp, country: string) {
  try {
    const response = await signup(payload, country);
    return response;
  } catch (error) {
    /// Analytics.trackEvent('signup error', {
    ///   error: JSON.stringify(error),
    /// });
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

export async function getProductsRequest(country: string) {
  const { getProducts } = BritboxAccountApi();

  try {
    const response = await getProducts({
      countryCode: country,
      returnAppChannels: 'T',
      salesChannel: Platform.OS === 'ios' ? 'iOS' : 'Android',
      offerType: 'New Customer',
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
    Analytics.trackEvent('addSubscriptionRequest', {
      response: JSON.stringify(response),
      addSubscriptionRequestObject: JSON.stringify(addSubscriptionRequestObject),
    });
    return response;
  } catch (error) {
    return error;
  }
}

export function* getProfileRequest() {
  try {
    const { expiresIn } = yield select(getExiresIn);
    const { accessToken } = yield select(getToken);
    const segment = yield select(getSegment);
    const { refreshToken: refreshTokenState } = yield select(getRefreshToken);

    const { response: responseRefreshToken } = yield call(
      refreshTokenWithExpiresIn,
      expiresIn,
      refreshTokenState
    );

    let token = accessToken;
    if (responseRefreshToken) {
      yield put(refreshTokenSuccess(responseRefreshToken));
      token = responseRefreshToken.accessToken;
    }

    const { response: responseProfile } = yield call(profile, token, segment);
    const { response: responseAccountDetail } = yield call(getAccountDetail, token);
    yield put(profileRequestSuccess({ ...responseProfile, ...responseAccountDetail }));
    const isAppleTVSearchSubscriptionSent = yield select(getIsAppleTVSearchSubscriptionSent);
    if (!isAppleTVSearchSubscriptionSent) {
      yield call(appleTVSubscription);
      yield put(sendAppleTvSearchSubscription());
    }
  } catch (error) {
    /// Analytics.trackEvent('user get profile', {
    ///   error: JSON.stringify(error),
    /// });
    const retry = yield select(getRetryTimes);

    if (retry > 2) {
      yield call(logout);
    }

    const isLogged = yield select(getIsLogged);
    if (isLogged) yield put(getProfileFailed(true));
    else yield call(logout);
  }
}

export async function getActiveSubscriptionRequest(token: string) {
  const { getActiveSubscription } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    const response = await getActiveSubscription();
    /// Analytics.trackEvent('getActiveSubscription', {
    ///   getActiveSubscription: JSON.stringify(
    ///     response.response?.accountServiceMessage[0]?.paymentMethod || response.response
    ///   ),
    /// });
    return response;
  } catch (error) {
    return error;
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
      segments: ['us'],
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

async function logoutRequest(accessToken: string) {
  const { logoutCustomer } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  try {
    const response = await logoutCustomer();
    return response;
  } catch (error) {
    return error;
  }
}

async function appleTVSubscription() {
  if (Platform.OS === 'ios') {
    await AppleTVController.appleTVSubscription();
  }
}

async function removeAppleTVSubscription() {
  if (Platform.OS === 'ios') {
    await AppleTVController.removeAppleTVSubscription();
  }
}

export function* logout() {
  try {
    const { accessToken } = yield select(getToken);
    yield call(logoutRequest, accessToken);
    yield put(logoutSuccess());
    yield put(retryClear());
    yield put(pollingProfileCancelled());
    yield call(removeAppleTVSubscription);
    yield put(revokeAppleTvSearchSubscription());
  } catch (error) {
    /// Analytics.trackEvent('logout', {
    ///   error: JSON.stringify(error),
    /// });
  }
}

async function watchlistRequest(
  { itemId, itemCustomId, isInWatchlist }: WatchListItem,
  accessToken: string,
  segment: string
) {
  const { bookmarkItemApp, deleteItemBookmark } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  try {
    let response;
    if (isInWatchlist) {
      response = await deleteItemBookmark(itemId, {
        segments: [segment],
      }).then(() => ({
        itemId,
        type: 'remove',
      }));
    } else {
      response = await bookmarkItemApp(itemId, {
        itemCustomId,
        useCustomId: true,
        segments: [segment],
      }).then((e) => ({
        ...e,
        type: 'add',
      }));
    }
    return { response };
  } catch (error) {
    return error;
  }
}

export function* watchlistToggleRequest({ payload }: { payload: WatchListItem }) {
  try {
    const { accessToken } = yield select(getToken);
    const segment = yield select(getSegment);
    const { response } = yield call(watchlistRequest, payload, accessToken, segment);
    if (response.type === 'add') {
      yield put(watchlistRequestAdd(response));
    }

    if (response.type === 'remove') {
      yield put(watchlistRequestRemove(response));
    }
  } catch (error) {
    // error
  }
}

async function continueWatchingRemoveRequest(
  { itemId }: ContinueWatchingItem,
  accessToken: string,
  segment: string
) {
  const { deleteWatched } = BritboxAccountApi({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });
  try {
    const response = await deleteWatched(
      {
        itemIds: [itemId],
      },
      {
        segments: [(segment || 'us').toLowerCase()],
      }
    ).then(() => ({
      itemId,
      type: 'remove',
    }));

    return { response };
  } catch (error) {
    return error;
  }
}

export function* continueWatchingRemoveRequestAction({
  payload,
}: {
  payload: ContinueWatchingItem;
}) {
  try {
    const { accessToken } = yield select(getToken);
    const segment = yield select(getSegment);
    const { response } = yield call(continueWatchingRemoveRequest, payload, accessToken, segment);
    if (response.type === 'remove') {
      yield put(continueWatchingRemoveRequestSuccess(response));
    }
  } catch (error) {
    // error
  }
}

export function* loginAfterRegisterRequest({
  payload,
}: {
  payload: { isPurchase: boolean; isAccount?: boolean };
}) {
  try {
    yield call(getProfileRequest);
    yield put(loggedInRequestSuccess());
    if (payload.isPurchase) {
      yield put(welcomeMessageOn());
    }
    if (payload.isAccount) {
      yield call(navigationGoBack);
    }
  } catch (error) {
    // error
  }
}

export function* getContinueWatchingRequest() {
  try {
    const { accessToken } = yield select(getToken);
    const segment = yield select(getSegment);
    const { getWatched, getContinueWatchingList } = BritboxAccountApi({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const watched = yield call(getWatched, {
      segments: [segment],
    });
    const watchedList = yield call(getContinueWatchingList, {
      segments: [segment],
      useCustomId: true,
      device: getDevice(),
      sub: 'Subscriber',
      page: 1,
      pageSize: 25,
      include: ['episode'],
    });

    yield put(continueWatchingRequestSuccess({ watched, watchedList }));
  } catch (error) {
    yield put(continueWatchingRequestError());
  }
}

function* fetchProfile() {
  while (true) {
    yield call(getProfileRequest);
    yield delay(100000);
  }
}

export function* watchProfilePollSaga() {
  while (true) {
    yield take(UserActionTypes.POLLING_PROFILE_REQUEST);
    yield race([call(fetchProfile), take(UserActionTypes.POLLING_PROFILE_CANCELLED)]);
  }
}

export default all([
  takeLatest(UserActionTypes.LOGIN_REQUEST, loginRequest),
  takeLatest(UserActionTypes.WATCHLIST_TOGGLE_REQUEST, watchlistToggleRequest),
  takeLatest(UserActionTypes.CONTINUE_WATCHING_REMOVE_REQUEST, continueWatchingRemoveRequestAction),
  takeLatest(UserActionTypes.LOGOUT, logout),
  takeEvery(UserActionTypes.GET_PROFILE_REQUEST, getProfileRequest),
  takeEvery(UserActionTypes.LOGIN_AFTER_REGISTER, loginAfterRegisterRequest),
  takeEvery(UserActionTypes.CONTINUE_WATCHING_REQUEST, getContinueWatchingRequest),
]);
