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
}

/**
 * State type
 */

export interface LayoutState {
  loading: boolean;
  out: boolean;
}
