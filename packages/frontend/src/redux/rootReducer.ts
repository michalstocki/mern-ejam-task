import { CombinedState, combineReducers, Reducer } from 'redux';
import { AppAction, State } from './store';
import { deployments } from './deployments/reducers/deployments';

export const rootReducer: Reducer<
  CombinedState<State>,
  AppAction
> = combineReducers({
  deployments,
});
