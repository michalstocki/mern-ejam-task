import { ThunkAction } from 'redux-thunk';
import {
  DeploymentBase,
  DeploymentJSON,
} from '../../../../../types/deployments/Deployment';
import { checkStatus } from '../../../common/fetch/checkStatus';
import { State } from '../../store';
import { DeploymentsState } from '../reducers/deployments';
import { AddDeploymentAction } from './addDeployment';
import { AnyDeploymentsAction } from './AnyDeploymentsAction';

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

    const action: AddDeploymentAction = {
      data: createdDeployment,
      type: 'AddDeployment',
    };

    dispatch(action);
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
