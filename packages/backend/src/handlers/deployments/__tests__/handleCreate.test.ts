import { CREATED } from 'http-status-codes';
import 'jest-extended';
import request from 'supertest';
import {
  Deployment,
  DeploymentBase,
  DeploymentJSON,
} from '../../../../../types/deployments/Deployment';
import { createTestEnv } from '../../../../testUtils/createTestEnv';
import { DeploymentSchema } from '../../../dataAccess/deployments/DeploymentSchema';
import { deploymentsCollection } from './__fixtures__/deploymentsCollection';

describe('handleCreate', () => {
  const { app, getCollection } = createTestEnv(deploymentsCollection);

  let responseBody: DeploymentJSON;
  const newDeploymentPayload: DeploymentBase = {
    templateName: 'Sporty',
    url: 'https://sporty.heroku.com/apps/mern-ejam-task',
    version: '2.0.0',
  };

  beforeEach(async () => {
    await request(app())
      .post('/deployments')
      .send(newDeploymentPayload)
      .expect('Content-Type', /json/)
      .expect(CREATED)
      .expect((resp) => {
        responseBody = { ...resp.body };
      });
  });

  it('adds new deployment to DB', async () => {
    const expectedDeploys: Deployment[] = [
      {
        _id: expect.anything(),
        deployedAt: new Date(2020, 3, 15, 22, 34, 12),
        templateName: 'Natural One',
        url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
        version: '2.0.0',
      },
      {
        _id: expect.anything(),
        deployedAt: new Date(2020, 6, 9, 22, 44, 12),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.0.0',
      },
      {
        _id: expect.anything(),
        deployedAt: new Date(2020, 6, 10, 22, 54, 12),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.1.1',
      },
      {
        ...newDeploymentPayload,
        _id: expect.anything(),
        deployedAt: expect.any(Date),
      },
    ];

    const deploymentsInDB: Deployment[] = await getCollection(
      'Deployments',
      DeploymentSchema,
      { deployedAt: 'asc' }
    );

    expect(deploymentsInDB).toEqual(expectedDeploys);
  });

  it('generates correct deployment date', async () => {
    const [newDeployment] = await getCollection(
      'Deployments',
      DeploymentSchema,
      { deployedAt: 'desc' }
    );

    const now: Date = new Date();
    const fiveSecondsAgo: Date = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds() - 5
    );
    expect(newDeployment.deployedAt).toBeBefore(now);
    expect(newDeployment.deployedAt).toBeAfter(fiveSecondsAgo);
  });

  it('responds with deployment object with ID', () => {
    const expectedResponseBody: DeploymentJSON = {
      ...newDeploymentPayload,
      _id: expect.any(String),
      deployedAt: expect.any(String),
    };
    expect(responseBody).toEqual(expectedResponseBody);
  });
});
