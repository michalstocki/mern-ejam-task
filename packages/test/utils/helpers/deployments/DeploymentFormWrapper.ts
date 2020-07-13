import { Page } from 'puppeteer';
import { DeploymentBase } from '../../../../types/deployments/Deployment';

const TEMPLATE_NAME_FIELD = '.deployments-form [name="templateName"]';
const URL_FIELD = '.deployments-form [name="url"]';
const VERSION_FIELD = '.deployments-form [name="version"]';
const SUBMIT_BUTTON = '.deployments-form [type="submit"]';

export class DeploymentFormWrapper {
  constructor(private page: Page) {}

  public async fillWithData({
    templateName,
    url,
    version,
  }: DeploymentBase): Promise<void> {
    await this.page.select(TEMPLATE_NAME_FIELD, templateName);
    await this.page.select(VERSION_FIELD, version);
    await this.page.type(URL_FIELD, url);
  }

  public async expectEmpty(): Promise<void> {
    const fieldValue = await this.page.$eval(
      URL_FIELD,
      (el) => (el as HTMLInputElement).value
    );

    expect(fieldValue).toEqual('');
  }

  public async submit(): Promise<void> {
    await this.page.click(SUBMIT_BUTTON);
    await this.page.waitForResponse((res) =>
      res.url().endsWith('/deployments')
    );
  }

  public async addMany(deployments: DeploymentBase[]): Promise<void> {
    for (let i = 0; i < deployments.length; i++) {
      const deployment = deployments[i];
      await this.fillWithData(deployment);
      await this.submit();
    }
  }
}
