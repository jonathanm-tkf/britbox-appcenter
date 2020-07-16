import { Reducer } from 'redux';
import produce from 'immer';
import { base, colorOptions, darkTheme } from './theme';
import { ThemeActionTypes, ThemeState } from './types';

const initialState: ThemeState = {
  theme: {
    ...base,
    ...colorOptions.black,
    ...darkTheme,
  },
};

const theme: Reducer<ThemeState> = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ThemeActionTypes.THEME_CHANGE_THEME: {
        draft.theme = { ...state.theme, ...action.payload.baseTheme };
        break;
      }
      case ThemeActionTypes.THEME_CHANGE_COLOR_THEME: {
        draft.theme = { ...state.theme, ...action.payload.colorTheme };
        break;
      }
      default:
    }
  });
};

export default theme;
