/* eslint-disable max-len */
import { action } from 'typesafe-actions';
import { BritboxAPIAccountModelsProfileGetProfileResponse } from '@src/sdks/Britbox.API.Account.TS/api';
import {
  UserActionTypes,
  UserLogin,
  EvergentLoginResponse,
  EvergentLoginResponseError,
} from './types';

export const loginRequest = ({ user, password }: UserLogin) =>
  action(UserActionTypes.LOGIN_REQUEST, { user, password });

export const loginRequestSuccess = (data: EvergentLoginResponse) =>
  action(UserActionTypes.LOGIN_REQUEST_SUCCESS, { ...data });

export const loginRequestError = (data: EvergentLoginResponseError) =>
  action(UserActionTypes.LOGIN_REQUEST_ERROR, { ...data });

export const loginRequestFailure = () => action(UserActionTypes.LOGIN_REQUEST_FAILURE);

export const loginRequestErrorClear = () => action(UserActionTypes.LOGIN_REQUEST_ERROR_CLEAR);

export const logout = () => action(UserActionTypes.LOGOUT);

export const profileRequestSuccess = (data: BritboxAPIAccountModelsProfileGetProfileResponse) =>
  action(UserActionTypes.PROFILE_REQUEST_SUCCESS, { ...data });
