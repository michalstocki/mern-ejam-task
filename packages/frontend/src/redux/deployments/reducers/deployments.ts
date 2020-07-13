import {
  DeploymentBase,
  DeploymentJSON,
} from '../../../../../types/deployments/Deployment';
import { DeploymentTemplate } from '../../../../../types/deployments/DeploymentTemplate';
import {
  DeploymentsActionTypes,
  DeploymentsActionTypeToAction,
} from '../actions/AnyDeploymentsAction';
import { handleAddDeployment } from './actionHandlers/handleAddDeployment';
import { handleEmptyDeploymentsForm } from './actionHandlers/handleEmptyDeploymentsForm';
import { handleLoadDeployments } from './actionHandlers/handleLoadDeployments';
import { handleRemoveDeployment } from './actionHandlers/handleRemoveDeployment';
import { handleSetDeploymentTemplates } from './actionHandlers/handleSetDeploymentTemplates';
import { handleUpdateDeploymentForm } from './actionHandlers/handleUpdateDeploymentForm';

export interface DeploymentsState {
  allIds: string[];
  byId: DeploymentsById;
  formFields: DeploymentsFormState;
  templates: TemplatesState;
}

export interface DeploymentsById {
  [id: string]: DeploymentJSON;
}

export type DeploymentsFormState = {
  [N in keyof DeploymentBase]: FormFieldState<N>;
};

export interface FormFieldState<N extends keyof DeploymentBase> {
  value: DeploymentBase[N];
  availableValues: string[];
}

export type TemplatesState = {
  [name: string]: DeploymentTemplate;
};

export const initialDeploymentsState: DeploymentsState = {
  allIds: [],
  byId: {},
  formFields: {
    templateName: {
      availableValues: [],
      value: '',
    },
    url: {
      availableValues: [],
      value: '',
    },
    version: {
      availableValues: [],
      value: '',
    },
  },
  templates: {},
};

type ActionHandler<T extends DeploymentsActionTypes> = (
  state: DeploymentsState,
  action: DeploymentsActionTypeToAction[T]
) => DeploymentsState;

const actionHandlers: { [T in DeploymentsActionTypes]: ActionHandler<T> } = {
  AddDeployment: handleAddDeployment,
  EmptyDeploymentsForm: handleEmptyDeploymentsForm,
  LoadDeployments: handleLoadDeployments,
  UpdateDeploymentForm: handleUpdateDeploymentForm,
  RemoveDeployment: handleRemoveDeployment,
  SetDeploymentTemplates: handleSetDeploymentTemplates,
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
