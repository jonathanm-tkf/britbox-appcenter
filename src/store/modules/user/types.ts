/**
 * Data types
 */

import {
  BritboxAPIAccountModelsProfileGetProfileResponse,
  BritboxAPIAccountModelsCustomerGetAccountDetailsResponse,
} from '@src/sdks/Britbox.API.Account.TS/api';

export interface User {
  name: string;
}

export interface UserLogin {
  user: string;
  password: string;
}

export interface UserSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  alertNotificationEmail: string;
}

/**
 * Action types
 */
export enum UserActionTypes {
  PERSIST_REHYDRATE = 'persist/REHYDRATE',
  LOGIN_REQUEST = '@user/LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS = '@user/LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_ERROR = '@user/LOGIN_REQUEST_ERROR',
  LOGIN_REQUEST_FAILURE = '@user/LOGIN_REQUEST_FAILURE',
  LOGIN_REQUEST_ERROR_CLEAR = '@user/LOGIN_REQUEST_ERROR_CLEAR',
  LOGOUT = '@user/LOGOUT',
  LOGOUT_SUCCESS = '@user/LOGOUT_SUCCESS',
  GET_PROFILE_REQUEST = '@user/GET_PROFILE_REQUEST',
  PROFILE_REQUEST_SUCCESS = '@user/PROFILE_REQUEST_SUCCESS',
  REGISTER_REQUEST_SUCCESS = '@user/REGISTER_REQUEST_SUCCESS',
  REFRESH_TOKEN_SUCCESS = '@user/REFRESH_TOKEN_SUCCESS',
  LOGGEDIN_REQUEST = '@user/LOGGEDIN_REQUEST',
  WATCHLIST_TOGGLE_REQUEST = '@user/WATCHLIST_TOGGLE_REQUEST',
  WATCHLIST_TOGGLE_REQUEST_ADD = '@user/WATCHLIST_TOGGLE_REQUEST_ADD',
  WATCHLIST_TOGGLE_REQUEST_REMOVE = '@user/WATCHLIST_TOGGLE_REQUEST_REMOVE',
  CONTINUE_WATCHING_REMOVE_REQUEST = '@user/CONTINUE_WATCHING_REMOVE_REQUEST',
  CONTINUE_WATCHING_REMOVE_REQUEST_SUCCESS = '@user/CONTINUE_WATCHING_REMOVE_REQUEST_SUCCESS',
  LOGIN_AFTER_REGISTER = '@user/LOGIN_AFTER_REGISTER',
  PROFILE_PARENTAL_CONTROL_ON = '@user/PROFILE_PARENTAL_CONTROL_ON',
  PROFILE_PARENTAL_CONTROL_OFF = '@user/PROFILE_PARENTAL_CONTROL_OFF',
  CONTINUE_WATCHING_REQUEST = '@user/CONTINUE_WATCHING_REQUEST',
  CONTINUE_WATCHING_REQUEST_SUCCESS = '@user/CONTINUE_WATCHING_REQUEST_SUCCESS',
  CONTINUE_WATCHING_REQUEST_ERROR = '@user/CONTINUE_WATCHING_REQUEST_ERROR',
  POLLING_PROFILE_REQUEST = '@user/POLLING_PROFILE_REQUEST',
  POLLING_PROFILE_CANCELLED = '@user/POLLING_PROFILE_CANCELLED',
}

/**
 * State type
 */

export type Access = EvergentLoginResponse | EvergentLoginError | undefined;

type Profile = BritboxAPIAccountModelsProfileGetProfileResponse &
  BritboxAPIAccountModelsCustomerGetAccountDetailsResponse & {
    bookmarkPendingProccesing: string | undefined;
  };

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  error: boolean;
  data: User;
  access: Access;
  profile: Profile | undefined;
}

export interface EvergentLogin {
  response: EvergentLoginResponse;
}

export interface EvergentLoginResponse {
  responseCode: 1 | 0;
  expiresIn: string;
  message: string;
  tokenType: string;
  refreshToken: string;
  accessToken: string;
  status: string;
}

interface FailureMessage {
  errorCode: string;
  errorMessage: string;
}

export interface EvergentLoginError {
  response: EvergentLoginResponseError;
}

export interface EvergentLoginResponseError {
  responseCode: 1 | 0;
  failureMessage: FailureMessage[];
}

export interface EvergentSignupError {
  response: EvergentSignupResponseError;
}

export interface EvergentSignupResponseError {
  responseCode: 1 | 0;
  failureMessage: FailureMessage[];
}

export interface EvergentResponseError {
  responseCode: 1 | 0;
  failureMessage: FailureMessage[];
}

export type WatchListItem = {
  itemId: string;
  isInWatchlist: boolean;
  itemCustomId: string;
};

export type ContinueWatchingItem = {
  itemId: string;
};
