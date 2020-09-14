import { action } from 'typesafe-actions';
import { BritboxAPIContentModelsPageGetPageResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { HomeActionTypes } from './types';

export const homeRequest = () => action(HomeActionTypes.HOME_REQUEST);

export const homeRequestSuccess = (data: BritboxAPIContentModelsPageGetPageResponse) =>
  action(HomeActionTypes.HOME_REQUEST_SUCCESS, { ...data });

export const homeRequestError = (data: any) =>
  action(HomeActionTypes.HOME_REQUEST_ERROR, { ...data });
