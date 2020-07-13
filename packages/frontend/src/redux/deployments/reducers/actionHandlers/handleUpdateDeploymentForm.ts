import { DeploymentBase } from '../../../../../../types/deployments/Deployment';
import { UpdateDeploymentFormAction } from '../../actions/updateDeploymentForm';
import { DeploymentsFormState, DeploymentsState } from '../deployments';

export function handleUpdateDeploymentForm(
  state: DeploymentsState,
  { fieldName, value }: UpdateDeploymentFormAction
): DeploymentsState {
  return {
    ...state,
    formFields: {
      ...state.formFields,
      ...updateAvailableVersions(state, fieldName, value),
      [fieldName]: {
        ...state.formFields[fieldName],
        value,
      },
    },
  };
}

function updateAvailableVersions(
  state: DeploymentsState,
  fieldName: keyof DeploymentBase,
  value: string
): Partial<DeploymentsFormState> {
  if (fieldName !== 'templateName' || !state.templates[value]) {
    return {};
  }

  const availableVersions = state.templates[value].versions;
  return {
    version: {
      availableValues: [...availableVersions],
      value: availableVersions[0],
    },
  };
}
