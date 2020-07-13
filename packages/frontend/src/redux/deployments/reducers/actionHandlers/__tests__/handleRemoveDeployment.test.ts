import { RemoveDeploymentAction } from '../../../actions/removeDeployment';
import { DeploymentsState, initialDeploymentsState } from '../../deployments';
import { handleRemoveDeployment } from '../handleRemoveDeployment';

describe('handleRemoveDeployment', () => {
  it('removes deployment of given id from state', () => {
    const action: RemoveDeploymentAction = {
      id: 'second-id',
      type: 'RemoveDeployment',
    };

    const initialState: DeploymentsState = {
      ...initialDeploymentsState,
      allIds: ['first-id', 'second-id', 'third-id'],
      byId: {
        'first-id': {
          _id: 'first-id',
          deployedAt: new Date(2020, 7, 10, 22, 42, 12).toJSON(),
          templateName: 'Sporty',
          url: 'https://mern-ejam-task.herokuapp.com/sporty',
          version: '1.2.1',
        },
        'second-id': {
          _id: 'second-id',
          deployedAt: new Date(2020, 7, 8, 11, 30, 10).toJSON(),
          templateName: 'Techno 01',
          url: 'https://mern-ejam-task.herokuapp.com/techno',
          version: '1.0.0',
        },
        'third-id': {
          _id: 'third-id',
          deployedAt: new Date(2020, 6, 30, 17, 35, 33).toJSON(),
          templateName: 'Techno 01',
          url: 'https://mern-ejam-task.herokuapp.com/techno',
          version: '2.0.1',
        },
      },
    };

    const expectedState: DeploymentsState = {
      ...initialDeploymentsState,
      allIds: ['first-id', 'third-id'],
      byId: {
        'first-id': {
          _id: 'first-id',
          deployedAt: new Date(2020, 7, 10, 22, 42, 12).toJSON(),
          templateName: 'Sporty',
          url: 'https://mern-ejam-task.herokuapp.com/sporty',
          version: '1.2.1',
        },
        'third-id': {
          _id: 'third-id',
          deployedAt: new Date(2020, 6, 30, 17, 35, 33).toJSON(),
          templateName: 'Techno 01',
          url: 'https://mern-ejam-task.herokuapp.com/techno',
          version: '2.0.1',
        },
      },
    };

    expect(handleRemoveDeployment(initialState, action)).toEqual(expectedState);
  });
});
