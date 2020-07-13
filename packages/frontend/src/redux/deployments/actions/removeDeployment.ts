export interface RemoveDeploymentAction {
  type: 'RemoveDeployment';
  id: string;
}

export function removeDeployment(id: string): RemoveDeploymentAction {
  return {
    id,
    type: 'RemoveDeployment',
  };
}
