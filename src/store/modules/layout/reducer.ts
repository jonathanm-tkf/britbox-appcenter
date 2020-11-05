import produce from 'immer';
import { Reducer } from 'redux';
import { LayoutState, LayoutActionTypes } from './types';
import { CoreActionTypes } from '../core/types';
import { HomeActionTypes } from '../home/types';

export const initialState: LayoutState = {
  loading: true,
  out: false,
  cast: undefined,
  castDetail: undefined,
  castState: undefined,
  connection: undefined,
  sheet: {
    content: () => null,
    height: 0,
    data: {},
  },
  isSheetVisible: false,
  event: undefined,
  pageView: undefined,
  device: '',
  autoPlay: false,
  welcomeMessage: false,
  error: undefined,
  retry: 1,
  finishedConfiguration: false,
  page: undefined,
  isShowMiniController: false,
  failedGetProfile: false,
  castPosition: {
    x: 0,
    y: 0,
  },
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
        // draft.out = false;
        // draft.loading = false;
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
      case LayoutActionTypes.LAYOUT_SHEET_COMPONENT:
        draft.sheet = {
          height: action.payload.height,
          content: action.payload.content,
          data: {},
        };
        break;
      case LayoutActionTypes.LAYOUT_SHOW_SHEET_BOTTOM:
        draft.isSheetVisible = true;
        draft.sheet.data = action.payload;
        break;
      case LayoutActionTypes.LAYOUT_HIDE_SHEET_BOTTOM:
        draft.isSheetVisible = false;
        draft.welcomeMessage = false;
        if (state.sheet.data?.canStream !== false) {
          draft.sheet = {
            content: () => null,
            height: 0,
            data: {},
          };
        }
        break;
      case LayoutActionTypes.LAYOUT_EVENT:
        draft.event = action.payload;
        break;
      case LayoutActionTypes.LAYOUT_PAGEVIEW:
        draft.pageView = action.payload.pageView;
        break;
      case LayoutActionTypes.LAYOUT_DEVICE:
        draft.device = action.payload.type;
        break;
      case LayoutActionTypes.LAYOUT_AUTOPLAY_OFF:
        draft.autoPlay = false;
        break;
      case LayoutActionTypes.LAYOUT_AUTOPLAY_ON:
        draft.autoPlay = true;
        break;
      case LayoutActionTypes.LAYOUT_WELCOME_MESSAGE_ON:
        draft.welcomeMessage = true;
        break;
      case LayoutActionTypes.LAYOUT_WELCOME_MESSAGE_OFF:
        draft.welcomeMessage = false;
        break;
      case LayoutActionTypes.LAYOUT_CAST_VIDEO_PLAYER_DETAIL_CLEAR:
        draft.castDetail = undefined;
        break;
      case LayoutActionTypes.LAYOUT_CAST_VIDEO_PLAYER_DETAIL:
        draft.castDetail = {
          currentTime: action.payload.currentTime,
          item: action.payload.item,
        };
        break;
      case LayoutActionTypes.RETRY_TIMES:
        draft.retry = 1 + state.retry;
        break;
      case LayoutActionTypes.ERROR_CONFIG:
        draft.error = true;
        break;
      case LayoutActionTypes.FINISHED_CONFIGURATION:
        draft.finishedConfiguration = true;
        break;
      case LayoutActionTypes.LAYOUT_CAST_STATE:
        draft.castState = action.payload.state;
        break;
      case LayoutActionTypes.TOGGLE_MINI_CONTROLLER:
        draft.isShowMiniController = action.payload.isShowMiniController;
        break;
      case LayoutActionTypes.GET_PROFILE_FAILED:
        draft.failedGetProfile = action.payload.failedGetProfile;
        break;
      case LayoutActionTypes.CAST_POSITION:
        draft.castPosition = action.payload;
        break;
      default:
        break;
    }
  });
};

export default layout;
