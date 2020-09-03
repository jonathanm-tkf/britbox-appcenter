import produce from 'immer';
import { Reducer } from 'redux';
import { LayoutState, LayoutActionTypes } from './types';
import { CoreActionTypes } from '../core/types';
import { HomeActionTypes } from '../home/types';

export const initialState: LayoutState = {
  loading: true,
  out: false,
  cast: false,
  connection: undefined,
};

const layout: Reducer<LayoutState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LayoutActionTypes.LAYOUT_LOADING_ON:
        draft.loading = true;
        break;
      case LayoutActionTypes.LAYOUT_LOADING_OFF:
        draft.loading = false;
        break;
      case CoreActionTypes.CONFIG_ERROR:
      case LayoutActionTypes.LAYOUT_OUT_ON: {
        draft.out = true;
        draft.loading = false;
        break;
      }
      case CoreActionTypes.CONFIG_SUCCESS:
      case LayoutActionTypes.LAYOUT_OUT_OFF:
        draft.out = false;
        break;
      case HomeActionTypes.HOME_REQUEST_SUCCESS:
        draft.out = false;
        draft.loading = false;
        break;
      case LayoutActionTypes.LAYOUT_CAST_ON:
        draft.cast = true;
        break;
      case LayoutActionTypes.LAYOUT_CAST_OFF:
        draft.cast = false;
        break;
      case LayoutActionTypes.CONNECTION:
        draft.connection = action.payload.type;
        break;
      default:
        break;
    }
  });
};

export default layout;
