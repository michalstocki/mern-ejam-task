import { AddDeploymentAction } from './addDeployment';
import { EmptyDeploymentsFormAction } from './emptyDeploymentsForm';
import { LoadDeploymentsAction } from './loadDeployments';
import { UpdateDeploymentFormAction } from './updateDeploymentForm';

export type DeploymentsActionTypes = keyof DeploymentsActionTypeToAction;
export type AnyDeploymentsAction = DeploymentsActionTypeToAction[DeploymentsActionTypes];

export interface DeploymentsActionTypeToAction {
  LoadDeployments: LoadDeploymentsAction;
  AddDeployment: AddDeploymentAction;
  UpdateDeploymentForm: UpdateDeploymentFormAction;
  EmptyDeploymentsForm: EmptyDeploymentsFormAction;
}
