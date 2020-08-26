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
  US = 'us',
  OUT = 'out',
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
  CONFIG_SUCCESS = '@core/CONFIG_SUCCESS',
  CONFIG_ERROR = '@core/CONFIG_ERROR',
}

/**
 * State type
 */

export interface CoreState {
  language: Language;
  segment: Segment;
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
