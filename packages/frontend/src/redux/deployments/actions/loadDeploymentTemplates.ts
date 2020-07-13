import { DeploymentTemplate } from '../../../../../types/deployments/DeploymentTemplate';
import { checkStatus } from '../../../common/fetch/checkStatus';
import { AppThunk } from '../../store';
import { setDeploymentTemplates } from './setDeploymentTemplates';

export function loadDeploymentTemplates(): AppThunk {
  return async (dispatch) => {
    const response = await fetch('/deployments/templates');
    checkStatus(response);
    const templates: DeploymentTemplate[] = await response.json();

    dispatch(setDeploymentTemplates(templates));
  };
}
