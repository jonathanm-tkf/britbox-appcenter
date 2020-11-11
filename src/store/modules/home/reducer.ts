import produce from 'immer';
import { Reducer } from 'redux';
import { BritboxAPIContentModelsPageGetPageResponse } from '@src/sdks/Britbox.API.Content.TS/api';
import { HomeState, HomeActionTypes } from './types';
// import { items } from './data';

export const initialState: HomeState = {
  loading: false,
  error: false,
  data: {
    entries: [],
  },
  deepLinkUrl: null,
  search: undefined,
};

const home: Reducer<HomeState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case HomeActionTypes.HOME_REQUEST:
        draft.loading = true;
        break;
      case HomeActionTypes.HOME_REQUEST_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = (action.payload as BritboxAPIContentModelsPageGetPageResponse).externalResponse;
        break;
      case HomeActionTypes.HOME_REQUEST_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case HomeActionTypes.HOME_DEEPLINK_URL:
        draft.deepLinkUrl = action.payload;
        break;
      case HomeActionTypes.HOME_SEARCH_SUCCESS:
        draft.search = action.payload;
        break;
      default:
        break;
    }
  });
};

export default home;
