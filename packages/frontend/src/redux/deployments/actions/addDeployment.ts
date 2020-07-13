import { DeploymentJSON } from '../../../../../types/deployments/Deployment';

export interface AddDeploymentAction {
  type: 'AddDeployment';
  data: DeploymentJSON;
}

export function addDeployment(data: DeploymentJSON): AddDeploymentAction {
  return {
    data,
    type: 'AddDeployment',
  };
}
