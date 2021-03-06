import { Page } from 'puppeteer';
import { DeploymentJSON } from '../../../../types/deployments/Deployment';

export class DeploymentWrapper {
  constructor(private page: Page, private index: number) {}

  public scrapData(): Promise<DeploymentJSON> {
    return this.page.$eval(
      `.App .deployments__item:nth-child(${this.index + 1})`,
      (el) => {
        return {
          deployedAt: el.querySelector('.deployments__time')!.innerHTML,
          templateName: el.querySelector('.deployments__name')!.innerHTML,
          url: el.querySelector('.deployments__url')!.innerHTML,
          version: el.querySelector('.deployments__version')!.innerHTML,
        };
      }
    );
  }

  public async delete() {
    return this.page.click(
      `.App .deployments__item:nth-child(${
        this.index + 1
      }) .deployments__delete`
    );
  }
}
