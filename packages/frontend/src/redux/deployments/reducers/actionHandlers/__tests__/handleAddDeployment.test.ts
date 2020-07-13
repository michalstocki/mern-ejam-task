import { DeploymentJSON } from '../../../../../../../types/deployments/Deployment';
import { AddDeploymentAction } from '../../../actions/addDeployment';
import { DeploymentsState, initialDeploymentsState } from '../../deployments';
import { handleAddDeployment } from '../handleAddDeployment';

describe('handleAddDeployment', () => {
  it('adds new deployment at the beginning of the list', () => {
    const newDeployment: DeploymentJSON = {
      _id: 'fourth-id',
      deployedAt: new Date(2020, 6, 17, 17, 35, 33).toJSON(),
      templateName: 'Sporty',
      url: 'https://mern-ejam-task.herokuapp.com/sporty',
      version: '1.3.0',
    };
    const action: AddDeploymentAction = {
      data: newDeployment,
      type: 'AddDeployment',
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
      allIds: [newDeployment._id!, 'first-id', 'second-id', 'third-id'],
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
        'fourth-id': newDeployment,
      },
    };

    expect(handleAddDeployment(initialState, action)).toEqual(expectedState);
  });
});
