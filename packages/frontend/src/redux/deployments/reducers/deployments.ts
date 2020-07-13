import {
  DeploymentBase,
  DeploymentJSON,
} from '../../../../../types/deployments/Deployment';
import {
  DeploymentsActionTypes,
  DeploymentsActionTypeToAction,
} from '../actions/AnyDeploymentsAction';
import { handleAddDeployment } from './actionHandlers/handleAddDeployment';
import { handleLoadDeployments } from './actionHandlers/handleLoadDeployments';
import { handleUpdateDeploymentForm } from './actionHandlers/handleUpdateDeploymentForm';

export interface DeploymentsState {
  allIds: string[];
  byId: DeploymentsById;
  formFields: DeploymentsFormState;
}

export interface DeploymentsById {
  [id: string]: DeploymentJSON;
}

export type DeploymentsFormState = {
  [N in keyof DeploymentBase]: FormFieldState<N>;
};

export interface FormFieldState<N extends keyof DeploymentBase> {
  value: DeploymentBase[N];
}

export const initialDeploymentsState: DeploymentsState = {
  allIds: [],
  byId: {},
  formFields: {
    templateName: { value: '' },
    url: { value: '' },
    version: { value: '' },
  },
};

type ActionHandler<T extends DeploymentsActionTypes> = (
  state: DeploymentsState,
  action: DeploymentsActionTypeToAction[T]
) => DeploymentsState;

const actionHandlers: { [T in DeploymentsActionTypes]: ActionHandler<T> } = {
  AddDeployment: handleAddDeployment,
  LoadDeployments: handleLoadDeployments,
  UpdateDeploymentForm: handleUpdateDeploymentForm,
};

export function deployments<T extends DeploymentsActionTypes>(
  state = initialDeploymentsState,
  action: DeploymentsActionTypeToAction[T]
): DeploymentsState {
  if (actionHandlers[action.type]) {
    return (actionHandlers[action.type] as ActionHandler<T>)(state, action);
  }

  return state;
}
