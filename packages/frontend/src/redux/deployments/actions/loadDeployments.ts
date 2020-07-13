import { Dispatch } from 'redux';
import { DeploymentJSON } from '../../../../../types/deployments/Deployment';
import { checkStatus } from '../../../common/fetch/checkStatus';
import { AppThunk } from '../../store';

export interface LoadDeploymentsAction {
  type: 'LoadDeployments';
  deployments: DeploymentJSON[];
}

export function loadDeployments(): AppThunk {
  return async (dispatch: Dispatch<LoadDeploymentsAction>) => {
    const response = await fetch('/deployments');
    checkStatus(response);
    const deployments: DeploymentJSON[] = await response.json();

    const action: LoadDeploymentsAction = {
      type: 'LoadDeployments',
      deployments,
    };

    dispatch(action);
  };
}
