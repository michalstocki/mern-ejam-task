import omit from 'lodash.omit';
import { RemoveDeploymentAction } from '../../actions/removeDeployment';
import { DeploymentsState } from '../deployments';

export function handleRemoveDeployment(
  state: DeploymentsState,
  action: RemoveDeploymentAction
): DeploymentsState {
  return {
    ...state,
    byId: omit(state.byId, action.id),
    allIds: state.allIds.filter((id) => id !== action.id),
  };
}
