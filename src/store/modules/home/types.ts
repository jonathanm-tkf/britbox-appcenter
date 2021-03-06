/**
 * Data types
 */

import { MassiveSDKModelItemList, MassiveSDKModelPage } from '@src/sdks/Britbox.API.Content.TS/api';

/**
 * Action types
 */
export enum HomeActionTypes {
  HOME_REQUEST = '@home/HOME_REQUEST',
  HOME_REQUEST_SUCCESS = '@home/HOME_REQUEST_SUCCESS',
  HOME_REQUEST_ERROR = '@home/HOME_REQUEST_ERROR',
  HOME_DEEPLINK_URL = '@home/HOME_DEEPLINK_URL',
  HOME_ACTIVATE_APP = '@home/HOME_ACTIVATE_APP',
  HOME_SEARCH = '@home/HOME_SEARCH',
  HOME_SEARCH_SUCCESS = '@home/HOME_SEARCH_SUCCESS',
  HOME_SEARCH_ERROR = '@home/HOME_SEARCH_ERROR',
}

/**
 * State type
 */

export interface HomeState {
  loading: boolean;
  error: boolean;
  data: MassiveSDKModelPage | undefined;
  deepLinkUrl: string | null;
  search: MassiveSDKModelItemList | undefined;
}
