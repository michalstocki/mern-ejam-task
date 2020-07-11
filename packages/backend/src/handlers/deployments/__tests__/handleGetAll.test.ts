import request from 'supertest';
import { createTestEnv } from '../../../../testUtils/createTestEnv';
import { DeploymentJSON } from '../../../types/deployments/Deployment';
import { deploymentsCollection } from './__fixtures__/deploymentsCollection';

describe('handleGetAll', () => {
  const { app } = createTestEnv(deploymentsCollection);

  it('returns all deployments as JSON sorted newest deploys first', async () => {
    const expectedDeploys: DeploymentJSON[] = [
      {
        _id: expect.any(String),
        deployedAt: new Date(2020, 7, 10, 22, 54, 12).toJSON(),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.1.1',
      },
      {
        _id: expect.any(String),
        deployedAt: new Date(2020, 7, 9, 22, 44, 12).toJSON(),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.0.0',
      },
      {
        _id: expect.any(String),
        deployedAt: new Date(2020, 7, 10, 22, 54, 12).toJSON(),
        templateName: 'Natural One',
        url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
        version: '2.0.0',
      },
    ];

    await request(app())
      .get('/deployments')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((resp) => {
        expect(resp.body).toEqual(expectedDeploys);
      });
  });
});
