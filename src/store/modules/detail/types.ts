import { MassiveSDKModelWatched } from '@src/sdks/Britbox.API.Account.TS/api';
import {
  MassiveSDKModelCredit,
  MassiveSDKModelEpisodes,
  MassiveSDKModelItemList,
  MassiveSDKModelItemSummary,
  MassiveSDKModelSeasons,
} from '@src/sdks/Britbox.API.Content.TS/api';
/**
 * Data types
 */

export type Detail = {
  title: string;
  description: string;
  relatedId: string | undefined;
  originalItem: MassiveSDKModelItemSummary | undefined;
  images: {
    tile?: string;
    brand?: string;
    poster?: string;
    block?: string;
    wallpaper?: string;
    hero3x1?: string;
    square?: string;
  };
};

export type Show = {
  seasons: MassiveSDKModelSeasons | undefined;
  releaseYear: number | undefined;
  seasonNumber: number | undefined;
  id: number | undefined;
  episodeNumber: number | undefined;
};

export type Information = {
  type: string;
  credits: MassiveSDKModelCredit[] | undefined;
  genres: string[] | undefined;
  customFields: any;
  classification: any;
  seasons: number;
  duration: number;
  releaseYear: number | undefined;
};

export type MoreInformation = {
  credits: MassiveSDKModelCredit[] | undefined;
  title: string;
  description: string;
  season: string;
  year: number | undefined;
  vams: any[] | undefined;
  trailers: any[] | undefined;
};

export type LoadDetailPageResponse = {
  detail: Detail;
  show: Show | undefined;
  information: Information;
  related: MassiveSDKModelItemList | undefined;
  episodes: MassiveSDKModelEpisodes | undefined;
  moreInformation: MoreInformation;
};

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
