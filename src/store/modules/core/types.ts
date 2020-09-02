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

export interface BritBoxCountryConfig {
  'pricing-marketing': PricingMarketing;
  paywall: PayWall[];
  login: Login;
  registration: Registration;
  'plan-selection': PlanSelection;
  'account-subscription': AccountSubscription;
  'customer-service': CustomerService;
  'parental-controls': ParentalControls;
}

export interface PricingMarketing {
  'pricing-message': string;
}

export interface PayWall {
  imageURL: string;
  title: string;
  description: string;
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

export interface Registration {
  title: string;
  description: string;
  'description-2': string;
  validation: Validation;
}

export interface Validation {
  messages: ValidationMessages;
  'password-regex': RegExp;
}

export interface ValidationMessages {
  'email-invalid': string;
  'password-mismatch': string;
  'password-rule': string;
}

export interface PlanSelection {
  title: string;
  description: string;
  'description-2': string;
  legal: string;
  summary: string;
  ctas: string[];
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

export interface ParentalControls {
  title: string;
  'help-link': string;
  'help-text': string;
  description: string;
  levels: ParentalControlsLevels[];
}

export interface ParentalControlsLevels {
  id: string;
  name?: string;
  'message-top': string;
  'message-box'?: string;
  labels?: string[];
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
}

/**
 * State type
 */

export interface CoreState {
  language: Language;
  segment: Segment;
  britboxConfig: BritBoxCountryConfig[];
  loading: boolean;
  token: string;
  isLogged: boolean;
  menu: Menu | undefined;
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
