import { action } from 'typesafe-actions';
import { CoreActionTypes, Menu } from './types';

export const changeLanguage = (language: string) =>
  action(CoreActionTypes.CHANGE_LANGUAGE, { language });

export const menuRequest = () => action(CoreActionTypes.MENU_REQUEST);

export const menuRequestSuccess = (data: Menu) => action(CoreActionTypes.MENU_SUCCESS, { ...data });

export const menuRequestError = () => action(CoreActionTypes.MENU_ERROR);

export const configRequest = () => action(CoreActionTypes.CONFIG_REQUEST);

export const configRequestSuccess = (data: string) =>
  action(CoreActionTypes.CONFIG_SUCCESS, { data });

export const configRequestError = () => action(CoreActionTypes.CONFIG_ERROR);
