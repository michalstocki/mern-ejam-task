import {
  DeploymentBase,
  DeploymentJSON,
} from '../../types/deployments/Deployment';
import { APP_READY_SELECTOR } from '../utils/launchBrowser';
import { openApp } from '../utils/openApp';

describe('removesDeploymentFromList', () => {
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

  describe('deleting deployment', () => {
    beforeAll(async () => {
      await deploymentForm().addMany(deployments);

      await deployment(1).delete();
    });

    it('removes deployment from the list', async () => {
      const childrenCount: number = await page().$eval(
        '.App .deployments',
        (el) => el.childElementCount
      );

      expect(childrenCount).toEqual(3);
    });

    it('keeps other deployments untouched', () => {
      return Promise.all(
        getExpectedDeployments().map(async (expected, index) => {
          const renderedInfo = await deployment(index).scrapData();

          expect(renderedInfo).toEqual(expected);
        })
      );
    });

    describe('and after refresh', () => {
      beforeAll(async () => {
        await page().reload();
        await page().waitForSelector(APP_READY_SELECTOR);
      });

      it('renders items without the deleted', () => {
        return Promise.all(
          getExpectedDeployments().map(async (expected, index) => {
            const renderedInfo = await deployment(index).scrapData();

            expect(renderedInfo).toEqual(expected);
          })
        );
      });
    });
  });
});

function getExpectedDeployments(): DeploymentJSON[] {
  const currentYear = new Date().getFullYear().toString();
  return [
    {
      deployedAt: expect.stringMatching(currentYear),
      templateName: 'Natural One',
      url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
      version: '2.0.0',
    },
    {
      deployedAt: expect.stringMatching(currentYear),
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.1.1',
    },
  ];
}
