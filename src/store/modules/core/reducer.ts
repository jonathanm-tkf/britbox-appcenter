import produce from 'immer';
import { Reducer } from 'redux';
import { CoreActionTypes, Language, CoreState } from './types';
import { UserActionTypes } from '../user/types';

export const initialState: CoreState = {
  language: Language.NO_LANGUAGE,
  loading: false,
  token: '',
  isLogged: false,
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
      case UserActionTypes.REGISTER_REQUEST_SUCCESS: {
        const { accessToken } = action.payload;
        draft.token = accessToken;
        break;
      }
      case UserActionTypes.LOGGEDIN_REQUEST: {
        draft.isLogged = true;
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
