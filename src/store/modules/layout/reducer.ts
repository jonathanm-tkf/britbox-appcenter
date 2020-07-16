import produce from 'immer';
import { Reducer } from 'redux';
import { LayoutActionTypes, LayoutState } from './types';

export const initialState: LayoutState = {
  hideTabs: false,
  activeTab: '',
  modalActive: false,
};

const layout: Reducer<LayoutState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LayoutActionTypes.TOGGLE_TABS: {
        draft.hideTabs = action.payload.value;
        break;
      }
      case LayoutActionTypes.CHANGE_TAB:
        draft.activeTab = action.payload.value;
        break;
      case LayoutActionTypes.TOGGLE_MODAL:
        draft.modalActive = !state.modalActive;
        break;
      default:
    }
  });
};

export default layout;
