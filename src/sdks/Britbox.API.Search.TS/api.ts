/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BritboxAPISearchModelsSearchGetResponse {
  externalResponse?: MassiveSDKModelSearchResults;
  errors?: string[];
  messages?: string[];
}

export interface MassiveSDKModelSearchResults {
  term?: string;
  total?: number;
  items?: MassiveSDKModelItemList;
  movies?: MassiveSDKModelItemList;
  tv?: MassiveSDKModelItemList;
  other?: MassiveSDKModelItemList;
  people?: MassiveSDKModelPerson[];
}

export interface MassiveSDKModelItemList {
  itemTypes?: (
    | 'movie'
    | 'show'
    | 'season'
    | 'episode'
    | 'program'
    | 'link'
    | 'trailer'
    | 'channel'
    | 'customAsset'
  )[];
  id?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  tagline?: string;
  path?: string;
  size?: number;
  items?: MassiveSDKModelItemSummary[];
  images?: Record<string, string>;
  parameter?: string;
  paging?: MassiveSDKModelPagination;
  customFields?: object;
  themes?: MassiveSDKModelTheme[];
  listData?: MassiveSDKModelListData;
}

export interface MassiveSDKModelPerson {
  name?: string;
  path?: string;
}

export interface MassiveSDKModelItemSummary {
  type?:
    | 'movie'
    | 'show'
    | 'season'
    | 'episode'
    | 'program'
    | 'link'
    | 'trailer'
    | 'channel'
    | 'customAsset';
  id?: string;
  subtype?: string;
  title?: string;
  contextualTitle?: string;
  shortDescription?: string;
  tagline?: string;
  classification?: MassiveSDKModelClassificationSummary;
  path?: string;
  watchPath?: string;
  scopes?: string[];
  releaseYear?: number;
  episodeCount?: number;
  availableEpisodeCount?: number;
  availableSeasonCount?: number;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeName?: string;
  showId?: string;
  showTitle?: string;
  seasonId?: string;
  seasonTitle?: string;
  channelShortCode?: string;
  hasClosedCaptions?: boolean;
  averageUserRating?: number;
  badge?: string;
  genres?: string[];
  duration?: number;
  customId?: string;
  offers?: MassiveSDKModelOffer[];
  images?: Record<string, string>;
  themes?: MassiveSDKModelTheme[];
  customFields?: object;
  show?: MassiveSDKModelShow;
  episodes?: MassiveSDKModelEpisodes;
  season?: MassiveSDKModelItemSummary;
  credits?: MassiveSDKModelCredit[];
  vams?: object[];
  trailers?: object[];
}

export interface MassiveSDKModelPagination {
  next?: string;
  previous?: string;
  page?: number;
  size?: number;
  total?: number;
  authorization?: MassiveSDKModelPaginationAuth;
  options?: MassiveSDKModelPaginationOptions;
}

export interface MassiveSDKModelTheme {
  type?: 'Background' | 'Text' | 'Custom';
  colors?: MassiveSDKModelThemeColor[];
}

export interface MassiveSDKModelListData {
  ContinueWatching?: MassiveSDKModelContinueWatchingListData;
}

export interface MassiveSDKModelClassificationSummary {
  code?: string;
  name?: string;
}

export interface MassiveSDKModelOffer {
  deliveryType?: 'Stream' | 'Download' | 'StreamOrDownload' | 'ProgressiveDownload' | 'None';
  resolution?: 'SD' | 'HD-720' | 'HD-1080' | 'HD-4K' | 'External' | 'Unknown';
  ownership?: 'Subscription' | 'Free' | 'Rent' | 'Own' | 'None';
  availability?: 'Available' | 'ComingSoon';
  scopes?: string[];
  maxPlays?: number;
  maxDownloads?: number;
  rentalPeriod?: number;
  playPeriod?: number;
  exclusionRules?: MassiveSDKModelExclusionRule[];
  id?: string;
  name?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  subscriptionCode?: string;
  customFields?: object;
}

export interface MassiveSDKModelShow {
  images?: Record<string, string>;
  advisoryText?: string;
  copyright?: string;
  credits?: MassiveSDKModelCredit[];
  customMetadata?: object[];
  distributor?: string;
  availableSeasonCount?: number;
  offers?: MassiveSDKModelOffer[];
  trailers?: object[];
  vams?: object[];
  scopes?: string[];
  categories?: string[];
  customFields?: object;
  customId?: string;
  genres?: string[];
  id?: string;
  type?: string;
  description?: string;
  maximumOfferEnd?: string;
  shortDescription?: string;
  contextualTitle?: string;
  themes?: object[];
  title?: string;
  totalUserRatings?: number;
  path?: string;
  genrePaths?: string[];
  seasons?: MassiveSDKModelSeasons;
}

export interface MassiveSDKModelEpisodes {
  id?: string;
  path?: string;
  items?: MassiveSDKModelEpisodesItem[];
  size?: number;
  paging?: MassiveSDKModelPaging;
}

export interface MassiveSDKModelCredit {
  role?:
    | 'actor'
    | 'associateproducer'
    | 'coactor'
    | 'director'
    | 'executiveproducer'
    | 'filminglocation'
    | 'guest'
    | 'narrator'
    | 'other'
    | 'presenter'
    | 'producer'
    | 'productmanager'
    | 'thememusicby'
    | 'voice'
    | 'writer';
  name?: string;
  path?: string;
  character?: string;
}

export interface MassiveSDKModelPaginationAuth {
  type?: 'UserAccount' | 'UserProfile';
  scope?: 'Catalog' | 'Commerce' | 'Settings';
}

export interface MassiveSDKModelPaginationOptions {
  order?: 'asc' | 'desc';
  orderBy?: 'a-z' | 'release-year' | 'date-added' | 'date-modified';
  itemType?:
    | 'movie'
    | 'show'
    | 'season'
    | 'episode'
    | 'program'
    | 'link'
    | 'trailer'
    | 'channel'
    | 'customAsset';
  pageSize?: number;
  maxRating?: string;
  completed?: boolean;
}

export interface MassiveSDKModelThemeColor {
  name?: string;
  opacity?: number;
  value?: string;
}

export interface MassiveSDKModelContinueWatchingListData {
  itemInclusions?: Record<string, MassiveSDKModelContinueWatchingListDataExpansion>;
}

export interface MassiveSDKModelExclusionRule {
  excludeDelivery?: 'Stream' | 'Download' | 'StreamOrDownload' | 'ProgressiveDownload' | 'None';
  excludeMinResolution?: 'SD' | 'HD-720' | 'HD-1080' | 'HD-4K' | 'External' | 'Unknown';
  description?: string;
  device?: string;
  excludeAirplay?: boolean;
  excludeChromecast?: boolean;
}

export interface MassiveSDKModelSeasons {
  id?: string;
  path?: string;
  items?: MassiveSDKModelSeasonsItem[];
  size?: number;
  paging?: MassiveSDKModelPaging;
}

export interface MassiveSDKModelEpisodesItem {
  images?: Record<string, string>;
  duration?: number;
  releaseYear?: number;
  episodeNumber?: number;
  episodeName?: string;
  seasonId?: string;
  showId?: string;
  offers?: MassiveSDKModelOffer[];
  scopes?: string[];
  categories?: string[];
  customFields?: object;
  customId?: string;
  genres?: string[];
  id?: string;
  type?: string;
  maximumOfferEnd?: string;
  media?: MassiveSDKModelMedia[];
  shortDescription?: string;
  contextualTitle?: string;
  title?: string;
  classification?: MassiveSDKModelClassification;
  totalUserRatings?: number;
  path?: string;
  watchPath?: string;
  showTitle?: string;
  seasonTitle?: string;
  badge?: string;
}

export interface MassiveSDKModelPaging {
  total?: number;
  page?: number;
  size?: number;
  options?: MassiveSDKModelOptions;
}

export interface MassiveSDKModelContinueWatchingListDataExpansion {
  episode?: MassiveSDKModelItemSummary;
  season?: MassiveSDKModelItemSummary;
  show?: MassiveSDKModelItemSummary;
}

export interface MassiveSDKModelSeasonsItem {
  images?: Record<string, string>;
  releaseYear?: number;
  availableEpisodeCount?: number;
  seasonNumber?: number;
  showId?: string;
  episodeCount?: number;
  offers?: MassiveSDKModelOffer[];
  scopes?: string[];
  categories?: string[];
  customFields?: object;
  customId?: string;
  genres?: string[];
  id?: string;
  type?: string;
  maximumOfferEnd?: string;
  media?: object[];
  shortDescription?: string;
  contextualTitle?: string;
  title?: string;
  classification?: MassiveSDKModelClassification;
  totalUserRatings?: number;
  path?: string;
  showTitle?: string;
}

export interface MassiveSDKModelMedia {
  duration?: number;
}

export interface MassiveSDKModelClassification {
  code?: string;
  name?: string;
  advisoryText?: string;
  level?: number;
  system?: string;
  images?: Record<string, string>;
}

export interface MassiveSDKModelOptions {
  pageSize?: number;
}

export type RequestParams = Omit<RequestInit, 'body' | 'method'> & {
  secure?: boolean;
};

export type RequestQueryParamsType = Record<string | number, any>;

type ApiConfig<SecurityDataType> = {
  baseUrl?: string;
  baseApiParams?: RequestParams;
  securityWorker?: (securityData: SecurityDataType) => RequestParams;
};

enum BodyType {
  Json,
}

class HttpClient<SecurityDataType> {
  public baseUrl: string = '';
  private securityData: SecurityDataType = null as any;
  private securityWorker: ApiConfig<SecurityDataType>['securityWorker'] = (() => {}) as any;

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor({ baseUrl, baseApiParams, securityWorker }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: RequestQueryParamsType, key: string) {
    return (
      encodeURIComponent(key) +
      '=' +
      encodeURIComponent(Array.isArray(query[key]) ? query[key].join(',') : query[key])
    );
  }

  protected addQueryParams(rawQuery?: RequestQueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys.length
      ? `?${keys
          .map((key) =>
            typeof query[key] === 'object' && !Array.isArray(query[key])
              ? this.addQueryParams(query[key] as object).substring(1)
              : this.addQueryParam(query, key)
          )
          .join('&')}`
      : '';
  }

  private bodyFormatters: Record<BodyType, (input: any) => any> = {
    [BodyType.Json]: JSON.stringify,
  };

  private mergeRequestOptions(
    params: RequestParams,
    securityParams?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {}),
      },
    };
  }

  private safeParseResponse = <T = any, E = any>(response: Response): Promise<T> =>
    response
      .json()
      .then((data) => data)
      .catch((e) => response.text);

  public request = <T = any, E = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    bodyType?: BodyType,
    secureByDefault?: boolean
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(
        params,
        (secureByDefault || secure) && this.securityWorker(this.securityData)
      ),
      method,
      body: body ? this.bodyFormatters[bodyType || BodyType.Json](body) : null,
    }).then(async (response) => {
      const data = await this.safeParseResponse<T, E>(response);
      if (!response.ok) throw data;
      return data;
    });
}

/**
 * @title BRITBOX SEARCH API - 1.0
 * @version 1.0
 * BRITBOX SEARCH API
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * @tags Search
     * @name Get
     * @request GET:/v1/search
     */
    get: (
      query?: {
        term?: string;
        include?: string[];
        group?: boolean;
        maxResults?: number;
        maxRating?: string;
        device?: string;
        sub?: string;
        useCustomId?: boolean;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPISearchModelsSearchGetResponse, any>(
        `/v1/search${this.addQueryParams(query)}`,
        'GET',
        params
      ),
  };
}
