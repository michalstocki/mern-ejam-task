import { LoadDeploymentsAction } from './loadDeployments';

export type DeploymentsActionTypes = keyof DeploymentsActionTypeToAction;
export type AnyDeploymentsAction = DeploymentsActionTypeToAction[DeploymentsActionTypes];

export interface DeploymentsActionTypeToAction {
  LoadDeployments: LoadDeploymentsAction;
}
