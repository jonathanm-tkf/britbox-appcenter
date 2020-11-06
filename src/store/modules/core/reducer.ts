import produce from 'immer';
import { Reducer } from 'redux';
import { Platform } from 'react-native';
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
  casting: false,
  castDetail: undefined,
  forceChromecast: Platform.OS === 'ios' && parseInt(Platform.Version.toString(), 10) >= 14,
  introChromecast: true,
  isAppleTVSearchSubscriptionSent: false,
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
      case CoreActionTypes.CASTING_ON: {
        draft.casting = true;
        break;
      }
      case CoreActionTypes.CASTING_OFF: {
        draft.casting = false;
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
      case CoreActionTypes.CAST_DETAIL: {
        draft.castDetail = action.payload;
        break;
      }
      case CoreActionTypes.CAST_DETAIL_CLEAR: {
        draft.castDetail = undefined;
        break;
      }
      case CoreActionTypes.SHOW_FORCE_CHROMECAST:
        draft.forceChromecast = true;
        break;
      case CoreActionTypes.HIDE_FORCE_CHROMECAST:
        draft.forceChromecast = false;
        break;
      case CoreActionTypes.HIDE_INTRO_CHROMECAST:
        draft.introChromecast = false;
        break;
      case CoreActionTypes.SEND_APPLE_TV_SEARCH_SUBSCRIPTION:
        draft.isAppleTVSearchSubscriptionSent = true;
        break;
      case CoreActionTypes.REVOKE_APPLE_TV_SEARCH_SUBSCRIPTION:
        draft.isAppleTVSearchSubscriptionSent = false;
        break;

      default:
    }
  });
};

export default core;
