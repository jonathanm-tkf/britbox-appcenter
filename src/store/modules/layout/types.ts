/**
 * Data types
 */

/**
 * Action types
 */
export enum LayoutActionTypes {
  LAYOUT_LOADING = '@layout/LAYOUT_LOADING',
  LAYOUT_LOADING_ON = '@layout/LAYOUT_LOADING_ON',
  LAYOUT_LOADING_OFF = '@layout/LAYOUT_LOADING_OFF',
  LAYOUT_OUT_ON = '@layout/LAYOUT_LOADING_OUT_ON',
  LAYOUT_OUT_OFF = '@layout/LAYOUT_LOADING_OUT_OFF',
  LAYOUT_CAST_ON = '@layout/LAYOUT_LOADING_CAST_ON',
  LAYOUT_CAST_OFF = '@layout/LAYOUT_LOADING_CAST_OFF',
  CONNECTION = '@layout/CONNECTION',
  LAYOUT_SHEET_COMPONENT = '@layout/LAYOUT_SHEET_COMPONENT',
  LAYOUT_SHOW_SHEET_BOTTOM = '@layout/LAYOUT_SHOW_SHEET_BOTTOM',
  LAYOUT_HIDE_SHEET_BOTTOM = '@layout/LAYOUT_HIDE_SHEET_BOTTOM',
  LAYOUT_EVENT = '@layout/LAYOUT_EVENT',
  LAYOUT_DEVICE = '@layout/LAYOUT_DEVICE',
  LAYOUT_AUTOPLAY_ON = '@layout/LAYOUT_AUTOPLAY_ON',
  LAYOUT_AUTOPLAY_OFF = '@layout/LAYOUT_AUTOPLAY_OFF',
}

/**
 * State type
 */

export interface LayoutState {
  loading: boolean;
  out: boolean;
  cast: boolean;
  connection: string | undefined;
  sheet: {
    content: () => JSX.Element | null;
    height: number;
    data: { [name: string]: any };
  };
  isSheetVisible: boolean;
  event: Record<string, unknown> | undefined;
  device: string;
  autoPlay: boolean;
}

export interface MediaSelectorResponse {
  responseMediaSelector: ResponseMediaSelector;
}

export interface ResponseMediaSelector {
  data: DataResponseMediaSlector;
  status: number;
  headers: LowerCaseResponseHeadersClass;
  config: Config;
  request: Request;
}

export interface Config {
  url: string;
  method: string;
  headers: ConfigHeaders;
  transformRequest: string[];
  transformResponse: string[];
  timeout: number;
  adapter: string;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  validateStatus: string;
}

export interface ConfigHeaders {
  Accept: string;
}

export interface DataResponseMediaSlector {
  media: Media[];
  disclaimer: string;
}

export interface Media {
  service: string;
  kind: string;
  type: string;
  encoding: string;
  expires: string;
  connection: Connection[];
  width?: string;
  bitrate?: string;
  height?: string;
}

export interface Connection {
  priority: string;
  protocol: Protocol;
  authExpiresOffset?: number;
  supplier: Supplier;
  authExpires?: string;
  href: string;
  transferFormat: TransferFormat;
  dpw: string;
}

export interface Subtitles {
  priority: number;
  protocol: string;
  supplier: string;
  href: string;
  transferFormat: string;
  dpw: number;
}

export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https',
}

export enum Supplier {
  MFAkamai = 'mf_akamai',
  MFLimelight = 'mf_limelight',
  UsClosedCaptions = 'us_closed_captions',
}

export enum TransferFormat {
  Dash = 'dash',
  HLS = 'hls',
  Plain = 'plain',
}

export interface LowerCaseResponseHeadersClass {
  server: string;
  connection: string;
  'content-type': string;
  'x-ms-disclaimer': string;
  'transfer-encoding': string;
  date: string;
  'x-requestid': string;
  'content-encoding': string;
  'cache-control': string;
}

export interface Request {
  UNSENT: number;
  OPENED: number;
  HEADERS_RECEIVED: number;
  LOADING: number;
  DONE: number;
  readyState: number;
  status: number;
  timeout: number;
  withCredentials: boolean;
  upload: Upload;
  _aborted: boolean;
  _hasError: boolean;
  _method: string;
  _response: string;
  _url: string;
  _timedOut: boolean;
  _trackingName: number;
  _incrementalEvents: boolean;
  responseHeaders: ResponseHeaders;
  _requestId: null;
  _headers: Headers;
  _responseType: string;
  _sent: boolean;
  _lowerCaseResponseHeaders: LowerCaseResponseHeadersClass;
  _subscriptions: any[];
  responseURL: string;
}

export interface Headers {
  accept: string;
}

export interface ResponseHeaders {
  Server: string;
  Connection: string;
  'Content-Type': string;
  'X-MS-Disclaimer': string;
  'Transfer-Encoding': string;
  Date: string;
  'X-RequestId': string;
  'Content-Encoding': string;
  'Cache-Control': string;
}

export interface Upload {}
