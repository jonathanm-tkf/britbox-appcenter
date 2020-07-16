/**
 * Data types
 */

export interface User {
  name: string;
}

export interface UserLogin {
  user: string;
  password: string;
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
}

/**
 * State type
 */

export interface UserState {
  isLogged: boolean;
  loading: boolean;
  error: boolean;
  data: User;
  access: EvergentLoginResponse | EvergentLoginError | undefined;
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
