import request from 'supertest';
import { createServer } from '../../../createServer';
import { DeploymentJSON } from '../../../types/deployments/Deployment';

describe('handleGetAll', () => {
  it('returns all deployments as JSON', async () => {
    const expectedDeploys:DeploymentJSON[] = [{
      deployedAt: new Date(2020, 3, 15).toJSON(), templateName: 'Natural One', url: 'https://naturalone.heroku.com/apps/mern-ejam-task', version: '2.0.0',
    },{
      deployedAt: new Date(2020, 7, 9).toJSON(), templateName: 'Techno 01', url: 'https://techno01.heroku.com/apps/mern-ejam-task', version: '1.0.0',
    },{
      deployedAt: new Date(2020, 7, 10).toJSON(), templateName: 'Techno 01', url: 'https://techno01.heroku.com/apps/mern-ejam-task', version: '1.1.1',
    }];

    await request(createServer())
      .get('/deployments')
      .expect('Content-Type', /json/)
      .expect(200, expectedDeploys);
  });
});
