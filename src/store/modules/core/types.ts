/**
 * Data types
 */

export interface Core {
  language: string;
}

export enum Language {
  EN = 'en',
  NO_LANGUAGE = '',
}

export enum Segment {
  LOADING = 'loading',
  US = 'us',
  OUT = 'out',
}

export interface BritBoxCountryConfig<Country, OutOfRegion> {
  [key: string]: Country | OutOfRegion;
}

export interface Country {
  'pricing-marketing': PricingMarketing;
  paywall: Paywall[];
  login: Login;
  registration: Registration;
  'plan-selection': PlanSelection;
  'account-subscription': AccountSubscription;
  'customer-service': CustomerService;
  'parental-controls': ParentalControls;
}

export interface AccountSubscription {
  'not-purchased': string[];
  web: string;
  ios: string;
  android: string;
  roku: string;
}

export interface CustomerService {
  phone: string;
  availability: string;
  email: string;
}

export interface Login {
  title: string;
  description: string;
  'description-2': string;
  ctas: string[];
  'error-messages': ErrorMessages;
}

export interface ErrorMessages {
  'login-error': string;
  'no-user': string;
}

export interface ParentalControls {
  title: string;
  'help-link': string;
  'help-text': string;
  description: string;
  levels: Level[];
}

export interface Level {
  id: number;
  'message-top': string;
  name?: string;
  labels?: string[];
  'message-box'?: string;
}

export interface Paywall {
  imageURL: string;
  title: string;
  description: string;
}
export interface PlanSelection {
  title: string;
  description: string;
  'description-2': string;
  legal: string;
  summary: string;
  ctas: string[];
}

export interface PricingMarketing {
  'pricing-message': string;
}

export interface Registration {
  title: string;
  description: string;
  'description-2': string;
  'statement-1': string;
  'statement-2': string;
  validation: Validation;
}

export interface Validation {
  messages: Messages;
  'password-regex': string;
}

export interface Messages {
  'email-invalid': string;
  'password-mismatch': string;
  'password-rule': string;
}

export interface OutOfRegion {
  message: string;
}

/**
 * Action types
 */
export enum CoreActionTypes {
  PERSIST_REHYDRATE = 'persist/REHYDRATE',
  CHANGE_LANGUAGE = '@core/CHANGE_LANGUAGE',
  MENU_REQUEST = '@core/MENU_REQUEST',
  MENU_SUCCESS = '@core/MENU_SUCCESS',
  MENU_ERROR = '@core/MENU_ERROR',
  CONFIG_REQUEST = '@core/CONFIG_REQUEST',
  CONFIG_SUCCESS = '@core/CONFIG_SUCCESS',
  CONFIG_ERROR = '@core/CONFIG_ERROR',
  BRITBOX_APP_CONFIG_SUCCESS = '@core/BRITBOX_APP_CONFIG_SUCCESS',
  CASTING_ON = '@core/CASTING_ON',
  CASTING_OFF = '@core/CASTING_OFF',
  CAST_DETAIL = '@core/CAST_DETAIL',
  CAST_DETAIL_CLEAR = '@core/CAST_DETAIL_CLEAR',
  HIDE_FORCE_CHROMECAST = '@core/HIDE_FORCE_CHROMECAST',
  SHOW_FORCE_CHROMECAST = '@core/SHOW_FORCE_CHROMECAST',
  CAST_VIDEO = '@layout/CAST_VIDEO',
  HIDE_INTRO_CHROMECAST = '@core/HIDE_INTRO_CHROMECAST',
  SEND_APPLE_TV_SEARCH_SUBSCRIPTION = '@core/SEND_APPLE_TV_SEARCH_SUBSCRIPTION',
  REVOKE_APPLE_TV_SEARCH_SUBSCRIPTION = '@core/REVOKE_APPLE_TV_SEARCH_SUBSCRIPTION',
}

/**
 * State type
 */

export interface CoreState {
  language: Language;
  segment: Segment;
  britboxConfig: BritBoxCountryConfig;
  loading: boolean;
  token: string;
  isLogged: boolean;
  menu: Menu | undefined;
  casting: boolean;
  castDetail: any;
  forceChromecast: boolean;
  introChromecast: boolean;
  isAppleTVSearchSubscriptionSent: boolean;
}

export interface Menu {
  segment: Segment;
  navigation: Navigation;
}

export interface Navigation {
  header: Header[];
  footer: Account;
  account: Account;
  copyright: string;
}

export interface Account {
  depth: number;
  children: AccountChild[];
}

export interface AccountChild {
  depth: number;
  children: Header[];
}

export interface HeaderChild {
  depth: number;
  label: string;
  children: Header[];
}

export interface Header {
  label: string;
  path?: string;
  depth: number;
  children?: HeaderChild[];
}
