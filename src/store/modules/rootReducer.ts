import { combineReducers } from 'redux';
import core from './core/reducer';
import { CoreState } from './core/types';
import theme from './theme/reducer';
import { ThemeState } from './theme/types';
import user from './user/reducer';
import { UserState } from './user/types';
import home from './home/reducer';
import { HomeState } from './home/types';

export interface AppState {
  core: CoreState;
  user: UserState;
  home: HomeState;
  theme: ThemeState;
}

export default combineReducers<AppState>({
  core,
  user,
  home,
  theme,
});
