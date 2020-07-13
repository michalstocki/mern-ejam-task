import { ThunkAction } from 'redux-thunk';
import {
  DeploymentBase,
  DeploymentJSON,
} from '../../../../../types/deployments/Deployment';
import { checkStatus } from '../../../common/fetch/checkStatus';
import { State } from '../../store';
import { DeploymentsState } from '../reducers/deployments';
import { addDeployment } from './addDeployment';
import { AnyDeploymentsAction } from './AnyDeploymentsAction';
import { emptyDeploymentsForm } from './emptyDeploymentsForm';

export function submitDeploymentForm(): ThunkAction<
  void,
  State,
  unknown,
  AnyDeploymentsAction
> {
  return async (dispatch, getState) => {
    const { deployments } = getState();
    const response = await fetch('/deployments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getNewDeploymentObjectFromState(deployments)),
    });

    checkStatus(response);
    const createdDeployment: DeploymentJSON = await response.json();

    dispatch(addDeployment(createdDeployment));
    dispatch(emptyDeploymentsForm());
  };
}

function getNewDeploymentObjectFromState({
  formFields,
}: DeploymentsState): DeploymentBase {
  return {
    templateName: formFields.templateName.value,
    url: formFields.url.value,
    version: formFields.version.value,
  };
}
