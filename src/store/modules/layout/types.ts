/**
 * Action types
 */
export enum LayoutActionTypes {
  TOGGLE_TABS = '@layout/TOGGLE_TABS',
  CHANGE_TAB = '@layout/CHANGE_TAB',
  TOGGLE_MODAL = '@layout/TOGGLE_MODAL',
}

/**
 * State type
 */

export interface LayoutState {
  hideTabs: boolean;
  activeTab: string;
  modalActive: boolean;
}
