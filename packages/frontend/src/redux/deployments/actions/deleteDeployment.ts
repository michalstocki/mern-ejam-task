import { checkStatus } from '../../../common/fetch/checkStatus';
import { AppThunk } from '../../store';
import { removeDeployment } from './removeDeployment';

export function deleteDeployment(id: string): AppThunk {
  return async (dispatch) => {
    const response = await fetch(`/deployments/${id}`, { method: 'DELETE' });

    checkStatus(response);

    dispatch(removeDeployment(id));
  };
}
