import { UpdateDeploymentFormAction } from '../../../actions/updateDeploymentForm';
import { DeploymentsState, initialDeploymentsState } from '../../deployments';
import { handleUpdateDeploymentForm } from '../handleUpdateDeploymentForm';

describe('handleUpdateDeploymentForm', () => {
  it('updates given field of a form state', () => {
    const initialState: DeploymentsState = {
      ...initialDeploymentsState,
      formFields: {
        templateName: { value: '' },
        url: { value: 'http://some.url' },
        version: { value: '' },
      },
    };

    const action: UpdateDeploymentFormAction = {
      fieldName: 'templateName',
      type: 'UpdateDeploymentForm',
      value: 'Natural',
    };

    const expectedState: DeploymentsState = {
      ...initialState,
      formFields: {
        templateName: { value: 'Natural' },
        url: { value: 'http://some.url' },
        version: { value: '' },
      },
    };

    expect(handleUpdateDeploymentForm(initialState, action)).toEqual(
      expectedState
    );
  });
});
