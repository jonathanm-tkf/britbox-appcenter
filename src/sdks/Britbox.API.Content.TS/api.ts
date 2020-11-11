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

export interface BritboxAPIContentModelsConfigGetConfigResponse {
  externalResponse?: MassiveSDKModelAppConfig;
  errors?: string[];
  messages?: string[];
}

export interface MassiveSDKModelAppConfig {
  classification?: Record<string, MassiveSDKModelClassification>;
  subscription?: MassiveSDKModelAppConfigSubscription;
  playback?: MassiveSDKModelAppConfigPlayback;
  general?: MassiveSDKModelAppConfigGeneral;
  navigation?: MassiveSDKModelNavigation;
  sitemap?: MassiveSDKModelPageSummary[];
  display?: MassiveSDKModelAppConfigDisplay;
  i18n?: MassiveSDKModelAppConfigI18N;
  linear?: MassiveSDKModelAppConfigLinear;
}

export interface MassiveSDKModelClassification {
  code?: string;
  name?: string;
  advisoryText?: string;
  level?: number;
  system?: string;
  images?: Record<string, string>;
}

export interface MassiveSDKModelAppConfigSubscription {
  plans?: MassiveSDKModelPlan[];
}

export interface MassiveSDKModelAppConfigPlayback {
  heartbeatFrequency?: number;
  viewEventPoints?: number[];
  chainPlaySqueezeback?: number;
  chainPlayTimeout?: number;
  chainPlayCountdown?: number;
}

export interface MassiveSDKModelAppConfigGeneral {
  websiteUrl?: string;
  gaToken?: string;
  stripeKey?: string;
  facebookAppId?: string;
  itemImageTypes?: Record<string, string>;
  currencyCode?: string;
  customFields?: object;
  maxUserRating?: number;
  mandatorySignIn?: boolean;
  defaultTimeZone?: string;
}

export interface MassiveSDKModelNavigation {
  header?: MassiveSDKModelNavEntry[];
  footer?: MassiveSDKModelNavEntry;
  account?: MassiveSDKModelNavEntry;
  copyright?: string;
  customFields?: object;
}

export interface MassiveSDKModelPageSummary {
  id?: string;
  title?: string;
  path?: string;
  key?: string;
  template?: string;
  isStatic?: boolean;
  isSystemPage?: boolean;
}

export interface MassiveSDKModelAppConfigDisplay {
  themes?: MassiveSDKModelTheme[];
}

export interface MassiveSDKModelAppConfigI18N {
  languages?: MassiveSDKModelLanguage[];
}

export interface MassiveSDKModelAppConfigLinear {
  viewingWindowDaysAfter?: number;
  viewingWindowDaysBefore?: number;
}

export interface MassiveSDKModelPlan {
  type?: 'Free' | 'Subscription';
  revenueType?: 'TVOD' | 'SVOD';
  billingPeriodType?: 'day' | 'week' | 'month' | 'year' | 'none';
  id?: string;
  title?: string;
  tagline?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  isPrivate?: boolean;
  subscriptionCode?: string;
  alias?: string;
  benefits?: string[];
  billingPeriodFrequency?: number;
  hasTrialPeriod?: boolean;
  trialPeriodDays?: number;
  termsAndConditions?: string;
  price?: number;
  currency?: string;
  customFields?: object;
}

export interface MassiveSDKModelNavEntry {
  depth?: number;
  label?: string;
  path?: string;
  content?: MassiveSDKModelNavContent;
  children?: MassiveSDKModelNavEntry[];
  featured?: boolean;
  customFields?: object;
}

export interface MassiveSDKModelTheme {
  type?: 'Background' | 'Text' | 'Custom';
  colors?: MassiveSDKModelThemeColor[];
}

export interface MassiveSDKModelLanguage {
  code?: string;
  label?: string;
  title?: string;
}

export interface MassiveSDKModelNavContent {
  title?: string;
  list?: MassiveSDKModelItemList;
  imageType?: string;
}

export interface MassiveSDKModelThemeColor {
  name?: string;
  opacity?: number;
  value?: string;
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

export interface MassiveSDKModelOptions {
  pageSize?: number;
}

export interface BritboxAPIContentModelsConfigGetLocationResponse {
  location?: string;
  errors?: string[];
  messages?: string[];
}

export interface BritboxAPIContentModelsItemsGetItemResponse {
  externalResponse?: MassiveSDKModelItemDetail;
  errors?: string[];
  messages?: string[];
}

export interface MassiveSDKModelItemDetail {
  advisoryText?: string;
  copyright?: string;
  distributor?: string;
  description?: string;
  customMetadata?: MassiveSDKModelItemCustomMetadata[];
  genrePaths?: string[];
  location?: string;
  venue?: string;
  eventDate?: string;
  credits?: MassiveSDKModelCredit[];
  seasons?: MassiveSDKModelItemList;
  episodes?: MassiveSDKModelItemList;
  season?: MassiveSDKModelItemDetail;
  show?: MassiveSDKModelItemDetail;
  totalUserRatings?: number;
  trailers?: MassiveSDKModelItemSummary[];
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
  vams?: object[];
}

export interface MassiveSDKModelItemCustomMetadata {
  name?: string;
  value?: string;
}

export interface BritboxAPIContentModelsItemsGetItemChildrenListResponse {
  externalResponse?: MassiveSDKModelItemList;
  errors?: string[];
  messages?: string[];
}

export interface BritboxAPIContentModelsItemsGetItemRelatedListResponse {
  externalResponse?: MassiveSDKModelItemList;
  errors?: string[];
  messages?: string[];
}

export interface BritboxAPIContentModelsListsGetListResponse {
  externalResponse?: MassiveSDKModelItemList;
  errors?: string[];
  messages?: string[];
}

export interface BritboxAPIContentModelsListsGetListsResponse {
  externalResponse?: MassiveSDKModelItemList[];
  errors?: string[];
  messages?: string[];
}

export interface BritboxAPIContentModelsPageGetPageResponse {
  externalResponse?: MassiveSDKModelPage;
  errors?: string[];
  messages?: string[];
}

export interface MassiveSDKModelPage {
  id?: string;
  title?: string;
  path?: string;
  key?: string;
  template?: string;
  isStatic?: boolean;
  isSystemPage?: boolean;
  metadata?: MassiveSDKModelPageMetadata;
  entries?: MassiveSDKModelPageEntry[];
  customFields?: object;
  item?: MassiveSDKModelItemDetail;
  list?: MassiveSDKModelItemList;
  themes?: MassiveSDKModelTheme[];
}

export interface MassiveSDKModelPageMetadata {
  description?: string;
  keywords?: string[];
}

export interface MassiveSDKModelPageEntry {
  type?:
    | 'ItemEntry'
    | 'ItemDetailEntry'
    | 'ListEntry'
    | 'ListDetailEntry'
    | 'UserEntry'
    | 'TextEntry'
    | 'ImageEntry'
    | 'CustomEntry'
    | 'PeopleEntry';
  id?: string;
  title?: string;
  template?: string;
  item?: MassiveSDKModelItemSummary;
  list?: MassiveSDKModelItemList;
  text?: string;
  people?: MassiveSDKModelPerson[];
  customFields?: object;
  images?: Record<string, string>;
}

export interface MassiveSDKModelPerson {
  name?: string;
  path?: string;
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
 * @title BRITBOX CONTENT API - 1.0
 * @version 1.0
 * BRITBOX CONTENT API
 */
export class Api<SecurityDataType = any> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * @tags Config
     * @name GetConfig
     * @request GET:/v1/content/Config
     */
    getConfig: (
      query?: { include?: string[]; device?: string; sub?: string; segments?: string[] },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsConfigGetConfigResponse, any>(
        `/v1/content/Config${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Config
     * @name GetLocation
     * @request GET:/v1/content/Config/location
     */
    getLocation: (params?: RequestParams) =>
      this.request<BritboxAPIContentModelsConfigGetLocationResponse, any>(
        `/v1/content/Config/location`,
        'GET',
        params
      ),

    /**
     * @tags Items
     * @name GetItem
     * @request GET:/v1/content/Items/{id}
     */
    getItem: (
      id: string,
      query?: {
        maxRating?: string;
        expand?: string;
        selectSeason?: string;
        useCustomId?: boolean;
        device?: string;
        sub?: string;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsItemsGetItemResponse, any>(
        `/v1/content/Items/${id}${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Items
     * @name GetItemChildrenList
     * @request GET:/v1/content/Items/{id}/children
     */
    getItemChildrenList: (
      id: string,
      query?: {
        page?: number;
        pageSize?: number;
        maxRating?: string;
        order?: string;
        device?: string;
        sub?: string;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsItemsGetItemChildrenListResponse, any>(
        `/v1/content/Items/${id}/children${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Items
     * @name GetItemRelatedList
     * @request GET:/v1/content/Items/{id}/related
     */
    getItemRelatedList: (
      id: string,
      query?: {
        page?: number;
        pageSize?: number;
        maxRating?: string;
        device?: string;
        sub?: string;
        useCustomId?: boolean;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsItemsGetItemRelatedListResponse, any>(
        `/v1/content/Items/${id}/related${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Lists
     * @name GetList
     * @request GET:/v1/content/Lists/{id}
     */
    getList: (
      id: string,
      query?: {
        page?: number;
        pageSize?: number;
        maxRating?: string;
        order?: string;
        orderBy?: string;
        param?: string;
        itemType?: string;
        device?: string;
        sub?: string;
        useCustomId?: boolean;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsListsGetListResponse, any>(
        `/v1/content/Lists/${id}${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Lists
     * @name GetLists
     * @request GET:/v1/content/Lists
     */
    getLists: (
      query?: {
        ids?: string[];
        pageSize?: number;
        maxRating?: string;
        order?: string;
        orderBy?: string;
        itemType?: string;
        device?: string;
        sub?: string;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsListsGetListsResponse, any>(
        `/v1/content/Lists${this.addQueryParams(query)}`,
        'GET',
        params
      ),

    /**
     * @tags Page
     * @name GetPage
     * @request GET:/v1/content/Page
     */
    getPage: (
      query?: {
        path?: string;
        useCustomId?: boolean;
        listPageSize?: number;
        listPageSizeLarge?: number;
        maxListPrefetch?: number;
        itemDetailExpand?: string;
        itemDetailSelectSeason?: string;
        textEntryFormat?: string;
        maxRating?: string;
        device?: string;
        sub?: string;
        segments?: string[];
      },
      params?: RequestParams
    ) =>
      this.request<BritboxAPIContentModelsPageGetPageResponse, any>(
        `/v1/content/Page${this.addQueryParams(query)}`,
        'GET',
        params
      ),
  };
}
