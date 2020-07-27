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
      default:
        break;
    }
  });
};

export default home;
