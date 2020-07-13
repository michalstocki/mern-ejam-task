import { SubmitDeploymentFormAction } from './submitDeploymentForm';
import { LoadDeploymentsAction } from './loadDeployments';
import { UpdateDeploymentFormAction } from './updateDeploymentForm';

export type DeploymentsActionTypes = keyof DeploymentsActionTypeToAction;
export type AnyDeploymentsAction = DeploymentsActionTypeToAction[DeploymentsActionTypes];

export interface DeploymentsActionTypeToAction {
  LoadDeployments: LoadDeploymentsAction;
  SubmitDeploymentForm: SubmitDeploymentFormAction;
  UpdateDeploymentForm: UpdateDeploymentFormAction;
}
