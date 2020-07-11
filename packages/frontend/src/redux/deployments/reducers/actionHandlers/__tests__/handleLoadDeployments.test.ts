import { LoadDeploymentsAction } from '../../../actions/loadDeployments';
import { DeploymentsState } from '../../deployments';
import { handleLoadDeployments } from '../handleLoadDeployments';

describe('handleLoadDeployments', () => {
  it('converts sorted list of deployments to a state object', () => {
    const acton: LoadDeploymentsAction = {
      deployments: [
        {
          _id: 'first-id',
          deployedAt: new Date(2020, 7, 10, 22, 42, 12).toJSON(),
          templateName: 'Sporty',
          url: 'https://mern-ejam-task.herokuapp.com/sporty',
          version: '1.2.1',
        },
        {
          _id: 'second-id',
          deployedAt: new Date(2020, 7, 8, 11, 30, 10).toJSON(),
          templateName: 'Techno 01',
          url: 'https://mern-ejam-task.herokuapp.com/techno',
          version: '1.0.0',
        },
        {
          _id: 'third-id',
          deployedAt: new Date(2020, 6, 30, 17, 35, 33).toJSON(),
          templateName: 'Techno 01',
          url: 'https://mern-ejam-task.herokuapp.com/techno',
          version: '2.0.1',
        },
      ],
      type: 'LoadDeployments',
    };

    const initialState: DeploymentsState = {
      allIds: [],
      byId: {},
    };

    const expectedState: DeploymentsState = {
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

    expect(handleLoadDeployments(initialState, acton)).toEqual(expectedState);
  });

  it('does not mutate the given state object', () => {
    const acton: LoadDeploymentsAction = {
      deployments: [
        {
          _id: 'first-id',
          deployedAt: new Date(2020, 7, 10, 22, 42, 12).toJSON(),
          templateName: 'Sporty',
          url: 'https://mern-ejam-task.herokuapp.com/sporty',
          version: '1.2.1',
        },
      ],
      type: 'LoadDeployments',
    };

    const initialState: DeploymentsState = {
      allIds: [],
      byId: {},
    };

    expect(handleLoadDeployments(initialState, acton)).not.toBe(initialState);
  });
});
