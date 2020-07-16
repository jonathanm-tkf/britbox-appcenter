import { action } from 'typesafe-actions';
import { CoreActionTypes } from './types';

export const changeLanguage = (language: string) =>
  action(CoreActionTypes.CHANGE_LANGUAGE, { language });
