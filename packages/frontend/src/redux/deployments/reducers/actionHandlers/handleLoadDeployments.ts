import { LoadDeploymentsAction } from '../../actions/loadDeployments';
import { DeploymentsState } from '../deployments';

export function handleLoadDeployments(
  state: DeploymentsState,
  { deployments }: LoadDeploymentsAction
): DeploymentsState {
  return deployments.reduce<DeploymentsState>(
    (resultingState, deployment) => {
      resultingState.byId[deployment._id!] = deployment;
      resultingState.allIds.push(deployment._id!);

      return resultingState;
    },
    {
      allIds: [],
      byId: {},
    }
  );
}
