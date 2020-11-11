import produce from 'immer';
import { Reducer } from 'redux';
import { DetailState, DetailActionTypes } from './types';

export const initialState: DetailState = {
  loading: false,
  error: false,
  data: undefined,
  watched: undefined,
};

const detail: Reducer<DetailState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case DetailActionTypes.DETAIL_REQUEST:
        draft.loading = true;
        break;
      case DetailActionTypes.DETAIL_REQUEST_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.payload;
        break;
      case DetailActionTypes.DETAIL_REQUEST_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case DetailActionTypes.DETAIL_CLEAR:
        draft.loading = false;
        draft.error = false;
        draft.data = undefined;
        draft.watched = undefined;
        break;
      case DetailActionTypes.DETAIL_WATCHED_REQUEST_SUCCESS:
        draft.watched = action.payload;
        break;
      default:
        break;
    }
  });
};

export default detail;
