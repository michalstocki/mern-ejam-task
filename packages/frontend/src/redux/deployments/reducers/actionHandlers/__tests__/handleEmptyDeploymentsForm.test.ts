import { EmptyDeploymentsFormAction } from '../../../actions/emptyDeploymentsForm';
import { DeploymentsState, initialDeploymentsState } from '../../deployments';
import { handleEmptyDeploymentsForm } from '../handleEmptyDeploymentsForm';

describe('handleEmptyDeploymentsForm', () => {
  it('removes all values form the form – brings back the initial state', () => {
    const initialState: DeploymentsState = {
      ...initialDeploymentsState,
      templates: {
        'Natural One': {
          name: 'Natural One',
          versions: ['3.2.2', '1.1.1'],
        },
        Sporty: {
          name: 'Sporty',
          versions: ['1.2.2', '1.1.1'],
        },
      },
      formFields: {
        templateName: {
          value: 'Sporty',
          availableValues: ['Natural One', 'Sporty'],
        },
        url: { value: 'http://some.url', availableValues: [] },
        version: { value: '', availableValues: ['1.2.2', '1.1.1'] },
      },
    };

    const action: EmptyDeploymentsFormAction = {
      type: 'EmptyDeploymentsForm',
    };

    const expectedState: DeploymentsState = {
      ...initialState,
      formFields: {
        templateName: {
          value: 'Natural One',
          availableValues: ['Natural One', 'Sporty'],
        },
        url: { value: '', availableValues: [] },
        version: { value: '3.2.2', availableValues: ['3.2.2', '1.1.1'] },
      },
    };

    expect(handleEmptyDeploymentsForm(initialState, action)).toEqual(
      expectedState
    );
  });
});
