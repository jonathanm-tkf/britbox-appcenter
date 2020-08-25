/* eslint-disable max-len */
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
  LOGIN_REQUEST = '@user/LOGIN_REQUEST',
  LOGIN_REQUEST_SUCCESS = '@user/LOGIN_REQUEST_SUCCESS',
  LOGIN_REQUEST_ERROR = '@user/LOGIN_REQUEST_ERROR',
  LOGIN_REQUEST_FAILURE = '@user/LOGIN_REQUEST_FAILURE',
  LOGIN_REQUEST_ERROR_CLEAR = '@user/LOGIN_REQUEST_ERROR_CLEAR',
  LOGOUT = '@user/LOGOUT',
  GET_PROFILE_REQUEST = '@user/GET_PROFILE_REQUEST',
  PROFILE_REQUEST_SUCCESS = '@user/PROFILE_REQUEST_SUCCESS',
  REGISTER_REQUEST_SUCCESS = '@user/REGISTER_REQUEST_SUCCESS',
  LOGGEDIN_REQUEST = '@user/LOGGEDIN_REQUEST',
}

/**
 * State type
 */

type Access = EvergentLoginResponse | EvergentLoginError | undefined;

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  error: boolean;
  data: User;
  access: Access;
  profile:
    | BritboxAPIAccountModelsProfileGetProfileResponse
    | BritboxAPIAccountModelsCustomerGetAccountDetailsResponse
    | undefined;
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
