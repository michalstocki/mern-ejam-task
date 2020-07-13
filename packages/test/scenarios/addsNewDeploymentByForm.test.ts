import 'jest-extended';
import { Deployment, DeploymentJSON } from '../../types/deployments/Deployment';
import { openApp } from '../utils/openApp';

const APP_READY_SELECTOR: string = '.App .deployments__item';

describe('addsNewDeploymentByForm', () => {
  const { page, deploymentForm, deployment } = openApp();

  describe('adding a new deployments to the list', () => {
    const deploymentData: Deployment = {
      templateName: 'Sporty',
      url: 'http://example.com',
      deployedAt: expect.toBeValidDate(),
      version: '1.3.0',
    };

    const expectedRenderedData: DeploymentJSON = {
      ...deploymentData,
      deployedAt: expect.stringMatching(new Date().getFullYear().toString()),
    };

    beforeAll(async () => {
      await deploymentForm().fillWithData(deploymentData);
      await deploymentForm().submit();
    });

    it('add the new item on top of the list', async () => {
      expect(await deployment(0).scrapData()).toEqual(expectedRenderedData);
    });

    it('clears the form', async () => {
      await deploymentForm().expectEmpty();
    });

    describe('after refresh', () => {
      beforeAll(async () => {
        await page().reload();
        await page().waitForSelector(APP_READY_SELECTOR);
      });

      it('still displays the new item', async () => {
        expect(await deployment(0).scrapData()).toEqual(expectedRenderedData);
      });
    });
  });
});
