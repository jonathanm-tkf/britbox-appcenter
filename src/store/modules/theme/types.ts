export interface ThemeProps {
  FONT_SIZE_TINY: number;
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_SIZE_EXTRA_LARGE: number;
  FONT_SIZE_MASSIVE: number;

  FONT_WEIGHT_LIGHT: string;
  FONT_WEIGHT_MEDIUM: string;
  FONT_WEIGHT_BOLD: string;

  PRIMARY_FONT_FAMILY: string;
  PRIMARY_FONT_FAMILY_BOLD: string;
  PRIMARY_FONT_FAMILY_LIGHT: string;
  PRIMARY_FONT_FAMILY_MEDIUM: string;

  PRIMARY_COLOR: string;
  BACKGROUND_COLOR: string;

  PRIMARY_TEXT_COLOR: string;
  PRIMARY_TEXT_COLOR_LIGHT: string;
  PRIMARY_TEXT_COLOR_OPAQUE: string;

  PRIMARY_COLOR_BOLD: string;
  PRIMARY_COLOR_FAINT: string;
  PRIMARY_COLOR_LIGHT: string;
  PRIMARY_COLOR_OPAQUE: string;
  PRIMARY_FOREGROUND_COLOR: string;

  SECONDARY_COLOR_BOLD: string;
  SECONDARY_COLOR_FAINT: string;
  SECONDARY_COLOR_LIGHT: string;
  SECONDARY_COLOR: string;
  SECONDARY_FOREGROUND_COLOR: string;

  ERROR_COLOR: string;
  SUCCESS_COLOR: string;
}
export interface ThemeState {
  theme: ThemeProps;
}

/**
 * Action types
 */
export enum ThemeActionTypes {
  THEME_CHANGE_THEME = '@theme/CHANGE_THEME',
  THEME_CHANGE_COLOR_THEME = '@theme/CHANGE_COLOR_THEME',
}
