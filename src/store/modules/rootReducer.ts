import { combineReducers } from 'redux';
import core from './core/reducer';
import { CoreState } from './core/types';
import theme from './theme/reducer';
import { ThemeState } from './theme/types';
import user from './user/reducer';
import { UserState } from './user/types';
import home from './home/reducer';
import { HomeState } from './home/types';
import search from './search/reducer';
import { SearchState } from './search/types';
import layout from './layout/reducer';
import { LayoutState } from './layout/types';
import detail from './detail/reducer';
import { DetailState } from './detail/types';

export interface AppState {
  core: CoreState;
  user: UserState;
  home: HomeState;
  theme: ThemeState;
  search: SearchState;
  layout: LayoutState;
  detail: DetailState;
}

export default combineReducers<AppState>({
  core,
  user,
  home,
  theme,
  search,
  layout,
  detail,
});
