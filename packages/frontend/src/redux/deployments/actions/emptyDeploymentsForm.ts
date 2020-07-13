export interface EmptyDeploymentsFormAction {
  type: 'EmptyDeploymentsForm';
}

export function emptyDeploymentsForm(): EmptyDeploymentsFormAction {
  return {
    type: 'EmptyDeploymentsForm',
  };
}
