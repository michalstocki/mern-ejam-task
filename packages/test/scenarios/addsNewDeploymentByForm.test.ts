import { Deployment } from '../../types/deployments/Deployment';
import { openApp } from '../utils/openApp';

describe('addsNewDeploymentByForm', () => {
  const { page, deploymentForm, deployment } = openApp();

  describe('adding a new deployments to the list', () => {
    const deploymentData: Deployment = {
      templateName: '',
      url: '',
      deployedAt: expect.toBeValidDate(),
      version: '',
    };

    beforeAll(async () => {
      await deploymentForm().fillWithData(deploymentData);
      await deploymentForm().submit();
    });

    it('add the new item on top of the list', async () => {
      expect(await deployment(0).scrapData()).toEqual(deploymentData);
    });

    it('clears the form', async () => {
      await deploymentForm().expectEmpty();
    });

    describe('after refresh', () => {
      beforeAll(async () => {
        await page().reload();
      });

      it('still displays the new item', async () => {
        expect(await deployment(0).scrapData()).toEqual(deploymentData);
      });
    });
  });
});
