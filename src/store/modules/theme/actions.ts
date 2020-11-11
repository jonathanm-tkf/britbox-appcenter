import { action } from 'typesafe-actions';
import { ThemeActionTypes } from './types';

export const changeTheme = (baseTheme: Record<string, unknown>) =>
  action(ThemeActionTypes.THEME_CHANGE_THEME, { baseTheme });
export const changeColorTheme = (colorTheme: Record<string, unknown>) =>
  action(ThemeActionTypes.THEME_CHANGE_COLOR_THEME, { colorTheme });
