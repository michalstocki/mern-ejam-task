import { EmptyDeploymentsFormAction } from '../../actions/emptyDeploymentsForm';
import { DeploymentsState } from '../deployments';

export function handleEmptyDeploymentsForm(
  state: DeploymentsState,
  action: EmptyDeploymentsFormAction
): DeploymentsState {
  const resetNameField = getResetNameField(state);
  const availableVersions = getAvailableVersions(state, resetNameField);

  return {
    ...state,
    formFields: {
      templateName: {
        ...state.formFields.templateName,
        value: resetNameField,
      },
      url: {
        availableValues: [],
        value: '',
      },
      version: {
        availableValues: [...availableVersions],
        value: availableVersions[0] || '',
      },
    },
  };
}

function getResetNameField(state: DeploymentsState) {
  return Object.keys(state.templates)[0] || '';
}

function getAvailableVersions(
  state: DeploymentsState,
  templateName: string
): string[] {
  if (state.templates[templateName]) {
    return state.templates[templateName].versions;
  }
  return [];
}
