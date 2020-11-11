import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
import { action } from 'typesafe-actions';
import { DetailActionTypes, LoadDetailPageResponse } from './types';

export const detailRequest = () => action(DetailActionTypes.DETAIL_REQUEST);

export const detailRequestSuccess = (data: LoadDetailPageResponse) =>
  action(DetailActionTypes.DETAIL_REQUEST_SUCCESS, { ...data });

export const detailWatchedSuccess = (data: Record<string, MassiveSDKModelWatched>) =>
  action(DetailActionTypes.DETAIL_WATCHED_REQUEST_SUCCESS, { ...data });

export const detailRequestError = (data: any) =>
  action(DetailActionTypes.DETAIL_REQUEST_ERROR, { ...data });

export const detailClear = () => action(DetailActionTypes.DETAIL_CLEAR);
