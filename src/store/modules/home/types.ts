/**
 * Data types
 */

import { MassiveSDKModelPage } from '@src/sdks/Britbox.API.Content.TS/api';

/**
 * Action types
 */
export enum HomeActionTypes {
  HOME_REQUEST = '@home/HOME_REQUEST',
  HOME_REQUEST_SUCCESS = '@home/HOME_REQUEST_SUCCESS',
  HOME_REQUEST_ERROR = '@home/HOME_REQUEST_ERROR',
}

/**
 * State type
 */

export interface HomeState {
  loading: boolean;
  error: boolean;
  data: MassiveSDKModelPage | undefined;
}
