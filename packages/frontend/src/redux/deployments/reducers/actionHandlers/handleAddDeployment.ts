import { AddDeploymentAction } from '../../actions/addDeployment';
import { DeploymentsState } from '../deployments';

export function handleAddDeployment(
  state: DeploymentsState,
  { data }: AddDeploymentAction
): DeploymentsState {
  return {
    ...state,
    byId: {
      ...state.byId,
      [data._id!]: {
        ...data,
      },
    },
    allIds: [data._id!, ...state.allIds],
  };
}
