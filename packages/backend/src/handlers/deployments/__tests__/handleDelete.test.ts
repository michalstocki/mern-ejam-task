import { OK } from 'http-status-codes';
import request from 'supertest';
import { Deployment } from '../../../../../types/deployments/Deployment';
import { createTestEnv } from '../../../../testUtils/createTestEnv';
import { DeploymentSchema } from '../../../dataAccess/deployments/DeploymentSchema';
import { deploymentsCollection } from './__fixtures__/deploymentsCollection';

jest.setTimeout(10000);
describe('handleDelete', () => {
  const { app, getCollection } = createTestEnv(deploymentsCollection);

  beforeEach(async () => {
    const [mostRecent] = await getCollection('Deployments', DeploymentSchema, {
      deployedAt: 'desc',
    });

    await request(app())
      .delete(`/deployments/${mostRecent._id}`)
      .expect(OK, {});
  });

  it('removes deployment from DB by given ID', async () => {
    const expectedRemainingDeployments: Deployment[] = [
      {
        _id: expect.anything(),
        deployedAt: new Date(2020, 6, 9, 22, 44, 12),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.0.0',
      },
      {
        _id: expect.anything(),
        deployedAt: new Date(2020, 3, 15, 22, 34, 12),
        templateName: 'Natural One',
        url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
        version: '2.0.0',
      },
    ];

    const remainingDeployments = await getCollection(
      'Deployments',
      DeploymentSchema,
      { deployedAt: 'desc' }
    );

    expect(remainingDeployments).toEqual(expectedRemainingDeployments);
  });
});
