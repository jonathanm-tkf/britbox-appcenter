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
/**
 * Action types
 */
export enum CoreActionTypes {
  PERSIST_REHYDRATE = 'persist/REHYDRATE',
  CHANGE_LANGUAGE = '@core/CHANGE_LANGUAGE',
}

/**
 * State type
 */

export interface CoreState {
  language: Language;
  loading: boolean;
  token: string;
  isLogged: boolean;
}
