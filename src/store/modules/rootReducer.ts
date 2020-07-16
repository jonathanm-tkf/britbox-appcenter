import { combineReducers } from 'redux';
import core from './core/reducer';
import { CoreState } from './core/types';
import theme from './theme/reducer';
import { ThemeState } from './theme/types';
import layout from './layout/reducer';
import { LayoutState } from './layout/types';
import user from './user/reducer';
import { UserState } from './user/types';

export interface AppState {
  core: CoreState;
  layout: LayoutState;
  user: UserState;
  theme: ThemeState;
}

export default combineReducers<AppState>({
  core,
  layout,
  user,
  theme,
});
