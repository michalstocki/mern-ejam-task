import { DeploymentJSON } from '../../../../../types/deployments/Deployment';
import {
  AnyDeploymentsAction,
  DeploymentsActionTypes,
  DeploymentsActionTypeToAction,
} from '../actions/AnyDeploymentsAction';
import { handleLoadDeployments } from './actionHandlers/handleLoadDeployments';

export interface DeploymentsState {
  allIds: string[];
  byId: DeploymentsById;
}

export interface DeploymentsById {
  [id: string]: DeploymentJSON;
}

const initialState: DeploymentsState = {
  allIds: [],
  byId: {},
};

type ActionHandler<T extends DeploymentsActionTypes> = (
  state: DeploymentsState,
  action: DeploymentsActionTypeToAction[T]
) => DeploymentsState;

const actionHandlers: { [T in DeploymentsActionTypes]: ActionHandler<T> } = {
  LoadDeployments: handleLoadDeployments,
};

export function deployments(
  state = initialState,
  action: AnyDeploymentsAction
): DeploymentsState {
  if (actionHandlers[action.type]) {
    return actionHandlers[action.type](state, action);
  }

  return state;
}
