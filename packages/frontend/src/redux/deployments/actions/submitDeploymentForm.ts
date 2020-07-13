export interface SubmitDeploymentFormAction {
  type: 'SubmitDeploymentForm';
}

export function submitDeploymentForm(): SubmitDeploymentFormAction {
  return { type: 'SubmitDeploymentForm' };
}
