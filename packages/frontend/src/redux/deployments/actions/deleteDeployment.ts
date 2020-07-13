import { ThunkAction } from 'redux-thunk';
import { checkStatus } from '../../../common/fetch/checkStatus';
import { State } from '../../store';
import { AnyDeploymentsAction } from './AnyDeploymentsAction';
import { removeDeployment } from './removeDeployment';

export function deleteDeployment(
  id: string
): ThunkAction<void, State, unknown, AnyDeploymentsAction> {
  return async (dispatch) => {
    const response = await fetch(`/deployments/${id}`, { method: 'DELETE' });

    checkStatus(response);

    dispatch(removeDeployment(id));
  };
}
