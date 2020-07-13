import { connectMongo } from 'mern-ejam-task-backend/src/dataAccess/connectMongo';
import { loadMongoFixtures } from 'mern-ejam-task-backend/testUtils/loadMongoFixtures';
import * as mongoose from 'mongoose';
import { deploymentsCollection } from '../../backend/src/handlers/deployments/__tests__/__fixtures__/deploymentsCollection';
import { DeploymentJSON } from '../../types/deployments/Deployment';
import { e2eTestAppConfig } from '../config';
import { openApp } from '../utils/openApp';

describe('rendersListOfDeployments', () => {
  beforeAll(async () => {
    // temporary – until there's no addition form + endpoint
    await connectMongo(e2eTestAppConfig);
    await loadMongoFixtures(deploymentsCollection);
  });

  afterAll(async () => {
    // temporary – until there's no addition form + endpoint
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  const { page } = openApp();

  it('displays list of the 3 deployments from database', async () => {
    const childrenCount: number = await page().$eval(
      '.App .deployments',
      (el) => el.childElementCount
    );

    expect(childrenCount).toEqual(3);
  });

  it('each Deployment item contains name, version, url and date', () => {
    const expectedDeployments: DeploymentJSON[] = [
      {
        deployedAt: new Date(2020, 7, 10, 22, 54, 12).toLocaleString(),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.1.1',
      },
      {
        deployedAt: new Date(2020, 7, 9, 22, 44, 12).toLocaleString(),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.0.0',
      },
      {
        deployedAt: new Date(2020, 3, 15, 22, 34, 12).toLocaleString(),
        templateName: 'Natural One',
        url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
        version: '2.0.0',
      },
    ];

    return Promise.all(
      expectedDeployments.map(async (expected, index) => {
        const renderedInfo: DeploymentJSON = await page().$eval(
          `.App .deployments__item:nth-child(${index + 1})`,
          (el) => {
            return {
              deployedAt: el.querySelector('.deployments__time')!.innerHTML,
              templateName: el.querySelector('.deployments__name')!.innerHTML,
              url: el.querySelector('.deployments__url')!.innerHTML,
              version: el.querySelector('.deployments__version')!.innerHTML,
            };
          }
        );

        expect(renderedInfo).toEqual(expected);
      })
    );
  });
});
