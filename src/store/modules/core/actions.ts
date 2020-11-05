import { MassiveSDKModelEpisodesItem } from '@src/sdks/Britbox.API.Account.TS/api';
import { action } from 'typesafe-actions';
import { CoreActionTypes, Menu, BritBoxCountryConfig } from './types';

export const changeLanguage = (language: string) =>
  action(CoreActionTypes.CHANGE_LANGUAGE, { language });

export const menuRequest = () => action(CoreActionTypes.MENU_REQUEST);

export const menuRequestSuccess = (data: Menu) => action(CoreActionTypes.MENU_SUCCESS, { ...data });

export const menuRequestError = () => action(CoreActionTypes.MENU_ERROR);

export const configRequest = () => action(CoreActionTypes.CONFIG_REQUEST);

export const castingOn = () => action(CoreActionTypes.CASTING_ON);
export const castingOff = () => action(CoreActionTypes.CASTING_OFF);

export const configRequestSuccess = (data: string) =>
  action(CoreActionTypes.CONFIG_SUCCESS, { data });

export const configRequestError = () => action(CoreActionTypes.CONFIG_ERROR);

export const britBoxAppConfigSuccess = (data: BritBoxCountryConfig) =>
  action(CoreActionTypes.BRITBOX_APP_CONFIG_SUCCESS, { ...data });

export const castDetail = (data: any) => action(CoreActionTypes.CAST_DETAIL, { ...data });

export const castDetailClear = () => action(CoreActionTypes.CAST_DETAIL_CLEAR);

export const showForceChromecast = () => action(CoreActionTypes.SHOW_FORCE_CHROMECAST);

export const hideForceChromecast = () => action(CoreActionTypes.HIDE_FORCE_CHROMECAST);

export const hideIntroChromecast = () => action(CoreActionTypes.HIDE_INTRO_CHROMECAST);

export const castVideo = (
  item: MassiveSDKModelEpisodesItem,
  pcToken?: string,
  playPosition?: number | boolean
) => action(CoreActionTypes.CAST_VIDEO, { item, pcToken, playPosition });
