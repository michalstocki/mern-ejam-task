import {
  DeploymentBase,
  DeploymentJSON,
} from '../../types/deployments/Deployment';
import { openApp } from '../utils/openApp';

describe('rendersListOfDeployments', () => {
  const { page, deployment, deploymentForm } = openApp();

  const deployments: DeploymentBase[] = [
    {
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.1.1',
    },
    {
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.0.0',
    },
    {
      templateName: 'Natural One',
      url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
      version: '2.0.0',
    },
  ];

  beforeAll(async () => {
    await deploymentForm().fillWithData(deployments[2]);
    await deploymentForm().submit();

    await deploymentForm().fillWithData(deployments[1]);
    await deploymentForm().submit();

    await deploymentForm().fillWithData(deployments[0]);
    await deploymentForm().submit();
  });

  it('displays list of the 3 deployments from database', async () => {
    const childrenCount: number = await page().$eval(
      '.App .deployments',
      (el) => el.childElementCount
    );

    expect(childrenCount).toEqual(3);
  });

  it('each Deployment item contains name, version, url and date', () => {
    const currentYear = new Date().getFullYear().toString();
    const expectedDeployments: DeploymentJSON[] = [
      {
        deployedAt: expect.stringMatching(currentYear),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.1.1',
      },
      {
        deployedAt: expect.stringMatching(currentYear),
        templateName: 'Techno 01',
        url: 'https://techno01.heroku.com/apps/mern-ejam-task',
        version: '1.0.0',
      },
      {
        deployedAt: expect.stringMatching(currentYear),
        templateName: 'Natural One',
        url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
        version: '2.0.0',
      },
    ];

    return Promise.all(
      expectedDeployments.map(async (expected, index) => {
        const renderedInfo = await deployment(index).scrapData();

        expect(renderedInfo).toEqual(expected);
      })
    );
  });
});
