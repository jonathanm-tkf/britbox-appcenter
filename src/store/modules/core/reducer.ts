import produce from 'immer';
import { Reducer } from 'redux';
import { CoreActionTypes, Language, CoreState, Segment } from './types';
import { UserActionTypes } from '../user/types';

export const initialState: CoreState = {
  language: Language.NO_LANGUAGE,
  segment: Segment.US,
  loading: false,
  token: '',
  isLogged: false,
  menu: undefined,
};

const core: Reducer<CoreState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CoreActionTypes.CHANGE_LANGUAGE: {
        draft.language = action.payload.language;
        break;
      }
      case UserActionTypes.LOGIN_REQUEST_SUCCESS: {
        const { accessToken } = action.payload;
        draft.isLogged = true;
        draft.token = accessToken;
        break;
      }
      case CoreActionTypes.MENU_SUCCESS: {
        draft.menu = action.payload;
        break;
      }
      case CoreActionTypes.MENU_ERROR: {
        draft.menu = undefined;
        break;
      }
      case UserActionTypes.LOGOUT: {
        draft.isLogged = false;
        draft.token = '';
        break;
      }
      default:
    }
  });
};

export default core;
