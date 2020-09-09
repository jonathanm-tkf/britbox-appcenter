import produce from 'immer';
import { Reducer } from 'redux';
import { CoreActionTypes, Language, CoreState, Segment } from './types';
import { UserActionTypes } from '../user/types';

export const initialState: CoreState = {
  language: Language.NO_LANGUAGE,
  segment: Segment.US,
  britboxConfig: undefined,
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
      case UserActionTypes.REFRESH_TOKEN_SUCCESS:
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
      case CoreActionTypes.CONFIG_SUCCESS: {
        draft.segment = action.payload.data;
        break;
      }
      case CoreActionTypes.CONFIG_ERROR: {
        draft.segment = Segment.OUT;
        break;
      }
      case CoreActionTypes.BRITBOX_APP_CONFIG_SUCCESS: {
        draft.britboxConfig = action.payload;
        break;
      }
      case UserActionTypes.REGISTER_REQUEST_SUCCESS: {
        const { accessToken } = action.payload;
        draft.token = accessToken;
        break;
      }
      case UserActionTypes.LOGGEDIN_REQUEST: {
        draft.isLogged = true;
        break;
      }
      case UserActionTypes.LOGOUT_SUCCESS: {
        draft.isLogged = false;
        draft.token = '';
        break;
      }
      default:
    }
  });
};

export default core;
