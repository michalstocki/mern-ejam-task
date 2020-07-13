import { UpdateDeploymentFormAction } from '../../actions/updateDeploymentForm';
import { DeploymentsState } from '../deployments';

export function handleUpdateDeploymentForm(
  state: DeploymentsState,
  { fieldName, value }: UpdateDeploymentFormAction
): DeploymentsState {
  return {
    ...state,
    formFields: {
      ...state.formFields,
      [fieldName]: {
        ...state.formFields[fieldName],
        value,
      },
    },
  };
}
