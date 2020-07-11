import { applyMiddleware, createStore, Store } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { AnyDeploymentsAction } from './deployments/actions/AnyDeploymentsAction';
import { DeploymentsState } from './deployments/reducers/deployments';
import { rootReducer } from './rootReducer';

export interface State {
  deployments: DeploymentsState;
}

export type AppAction = AnyDeploymentsAction;

export type AppStore = Store<State, AppAction> & {
  dispatch: ThunkDispatch<State, unknown, AppAction>;
};

export const store: AppStore = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);
