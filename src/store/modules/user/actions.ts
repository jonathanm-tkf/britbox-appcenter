import { action } from 'typesafe-actions';
import { BritboxAPIAccountModelsProfileGetProfileResponse } from '@src/sdks/Britbox.API.Account.TS/api';
import {
  UserActionTypes,
  UserLogin,
  EvergentLoginResponse,
  EvergentLoginResponseError,
  WatchListItem,
  ContinueWatchingItem,
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
export const logoutSuccess = () => action(UserActionTypes.LOGOUT_SUCCESS);

export const getProfileRequest = () => action(UserActionTypes.GET_PROFILE_REQUEST);

export const profileRequestSuccess = (data: BritboxAPIAccountModelsProfileGetProfileResponse) =>
  action(UserActionTypes.PROFILE_REQUEST_SUCCESS, { ...data });

export const registerRequestSuccess = (data: EvergentLoginResponse) =>
  action(UserActionTypes.REGISTER_REQUEST_SUCCESS, { ...data });

export const refreshTokenSuccess = (data: EvergentLoginResponse) =>
  action(UserActionTypes.REFRESH_TOKEN_SUCCESS, { ...data });

export const loggedInRequest = () => action(UserActionTypes.LOGGEDIN_REQUEST);

export const watchlistToggleRequest = ({ itemId, isInWatchlist }: WatchListItem) =>
  action(UserActionTypes.WATCHLIST_TOGGLE_REQUEST, { itemId, isInWatchlist });

export const watchlistRequestAdd = (data: any) =>
  action(UserActionTypes.WATCHLIST_TOGGLE_REQUEST_ADD, { ...data });

export const watchlistRequestRemove = (data: any) =>
  action(UserActionTypes.WATCHLIST_TOGGLE_REQUEST_REMOVE, { ...data });

export const continueWatchingRemoveRequest = ({ itemId }: ContinueWatchingItem) =>
  action(UserActionTypes.CONTINUE_WATCHING_REMOVE_REQUEST, { itemId });

export const continueWatchingRemoveRequestSuccess = (data: any) =>
  action(UserActionTypes.CONTINUE_WATCHING_REMOVE_REQUEST_SUCCESS, { ...data });

export const loginAfterRegister = () => action(UserActionTypes.LOGIN_AFTER_REGISTER);

export const parentalControlOn = () => action(UserActionTypes.PROFILE_PARENTAL_CONTROL_ON);

export const parentalControlOff = () => action(UserActionTypes.PROFILE_PARENTAL_CONTROL_OFF);

export const continueWatchingRequest = () => action(UserActionTypes.CONTINUE_WATCHING_REQUEST);

export const continueWatchingRequestSuccess = (data: Record<string, unknown>) =>
  action(UserActionTypes.CONTINUE_WATCHING_REQUEST_SUCCESS, { ...data });

export const continueWatchingRequestError = () =>
  action(UserActionTypes.CONTINUE_WATCHING_REQUEST_ERROR);
