import { EmptyDeploymentsFormAction } from '../../actions/emptyDeploymentsForm';
import { DeploymentsState, initialDeploymentsState } from '../deployments';

export function handleEmptyDeploymentsForm(
  state: DeploymentsState,
  action: EmptyDeploymentsFormAction
): DeploymentsState {
  return {
    ...state,
    formFields: {
      ...initialDeploymentsState.formFields,
    },
  };
}
