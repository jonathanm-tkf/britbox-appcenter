import produce from 'immer';
import { Reducer } from 'redux';
import { UserState, UserActionTypes } from './types';

export const initialState: UserState = {
  isLogged: false,
  loading: false,
  error: false,
  data: {
    name: '',
  },
  access: undefined,
  profile: undefined,
};

const user: Reducer<UserState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case UserActionTypes.LOGIN_REQUEST:
        draft.loading = true;
        break;
      case UserActionTypes.LOGIN_REQUEST_SUCCESS:
        draft.isLogged = true;
        draft.loading = false;
        draft.error = false;
        draft.access = action.payload;
        break;
      case UserActionTypes.LOGIN_REQUEST_FAILURE:
      case UserActionTypes.LOGIN_REQUEST_ERROR:
        draft.isLogged = false;
        draft.loading = false;
        draft.error = true;
        draft.access = action.payload;
        break;
      case UserActionTypes.LOGIN_REQUEST_ERROR_CLEAR:
        draft.loading = false;
        draft.error = false;
        draft.access = undefined;
        break;
      case UserActionTypes.LOGOUT_SUCCESS:
        draft.isLogged = false;
        draft.access = undefined;
        draft.profile = undefined;
        break;
      case UserActionTypes.PROFILE_REQUEST_SUCCESS:
        draft.profile = action.payload;
        break;
      case UserActionTypes.REFRESH_TOKEN_SUCCESS:
      case UserActionTypes.REGISTER_REQUEST_SUCCESS:
        draft.access = action.payload;
        break;
      case UserActionTypes.LOGGEDIN_REQUEST:
        draft.isLogged = true;
        draft.loading = false;
        draft.error = false;
        break;
      case UserActionTypes.WATCHLIST_TOGGLE_REQUEST_REMOVE: {
        const profile = {
          ...state.profile,
          bookmarkList: {
            ...state.profile.bookmarkList,
            items: state.profile.bookmarkList.items.filter(
              (item: { id: string }) =>
                parseInt(item.id, 10) !== parseInt(action.payload.itemId, 10)
            ),
          },
        };
        draft.profile = profile;
        break;
      }
      case UserActionTypes.WATCHLIST_TOGGLE_REQUEST_ADD: {
        const { externalResponse, itemDetail } = action.payload;
        const { itemId: id, creationDate: date } = externalResponse;
        const profile = {
          ...state.profile,
          bookmarks: {
            [id]: date,
            ...state.profile.bookmarks,
          },
          bookmarkList: {
            ...state.profile.bookmarkList,
            items: [{ date, ...itemDetail }, ...(state.profile.bookmarkList.items || [])],
          },
        };

        draft.profile = profile;
        break;
      }
      default:
        break;
    }
  });
};

export default user;
