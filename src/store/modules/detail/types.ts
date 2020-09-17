import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
/**
 * Data types
 */
import { LoadDetailPageResponse } from '@src/services/detail';

/**
 * Action types
 */
export enum DetailActionTypes {
  DETAIL_REQUEST = '@detail/DETAIL_REQUEST',
  DETAIL_REQUEST_SUCCESS = '@detail/DETAIL_REQUEST_SUCCESS',
  DETAIL_REQUEST_ERROR = '@detail/DETAIL_REQUEST_ERROR',
  DETAIL_WATCHED_REQUEST_SUCCESS = '@detail/DETAIL_WATCHED_REQUEST_SUCCESS',
  DETAIL_CLEAR = '@detail/DETAIL_CLEAR',
}

/**
 * State type
 */

export interface DetailState {
  loading: boolean;
  error: boolean;
  data: LoadDetailPageResponse | undefined;
  watched: Record<string, MassiveSDKModelWatched> | undefined;
}
