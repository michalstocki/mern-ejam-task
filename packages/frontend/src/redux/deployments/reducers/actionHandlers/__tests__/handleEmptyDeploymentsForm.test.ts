import { EmptyDeploymentsFormAction } from '../../../actions/emptyDeploymentsForm';
import { DeploymentsState, initialDeploymentsState } from '../../deployments';
import { handleEmptyDeploymentsForm } from '../handleEmptyDeploymentsForm';

describe('handleEmptyDeploymentsForm', () => {
  it('removes all values form the form – brings back the initial state', () => {
    const initialState: DeploymentsState = {
      ...initialDeploymentsState,
      formFields: {
        templateName: { value: 'Sporty' },
        url: { value: 'http://some.url' },
        version: { value: '' },
      },
    };

    const action: EmptyDeploymentsFormAction = {
      type: 'EmptyDeploymentsForm',
    };

    const expectedState: DeploymentsState = {
      ...initialState,
      formFields: {
        templateName: { value: '' },
        url: { value: '' },
        version: { value: '' },
      },
    };

    expect(handleEmptyDeploymentsForm(initialState, action)).toEqual(
      expectedState
    );
  });
});
