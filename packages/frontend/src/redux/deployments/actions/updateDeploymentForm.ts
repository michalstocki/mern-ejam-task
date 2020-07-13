import { DeploymentBase } from '../../../../../types/deployments/Deployment';

export interface UpdateDeploymentFormAction {
  type: 'UpdateDeploymentForm';
  fieldName: keyof DeploymentBase;
  value: string;
}

export function updateDeploymentForm(
  fieldName: keyof DeploymentBase,
  value: string
): UpdateDeploymentFormAction {
  return {
    fieldName,
    type: 'UpdateDeploymentForm',
    value,
  };
}
