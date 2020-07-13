import { Page } from 'puppeteer';
import { DeploymentBase } from '../../../../types/deployments/Deployment';

const TEMPLATE_NAME_FIELD = '.deployments-form [name="templateName"]';
const URL_FIELD = '.deployments-form [name="url"]';
const VERSION_FIELD = '.deployments-form [name="version"]';
const SUBMIT_BUTTON = '.deployments-form [type="submit"]';

const ALL_FIELDS = [TEMPLATE_NAME_FIELD, URL_FIELD, VERSION_FIELD];

export class DeploymentFormWrapper {
  constructor(private page: Page) {}

  public async fillWithData({
    templateName,
    url,
    version,
  }: DeploymentBase): Promise<void> {
    await this.page.type(TEMPLATE_NAME_FIELD, templateName);
    await this.page.type(URL_FIELD, url);
    await this.page.type(VERSION_FIELD, version);
  }

  public expectEmpty(): Promise<void[]> {
    return Promise.all(
      ALL_FIELDS.map(async (fieldSelector) => {
        const fieldValue = await this.page.$eval(
          fieldSelector,
          (el) => (el as HTMLInputElement).value
        );

        expect(fieldValue).toEqual('');
      })
    );
  }

  public async submit(): Promise<void> {
    await this.page.click(SUBMIT_BUTTON);
    await this.page.waitForResponse((res) =>
      res.url().endsWith('/deployments')
    );
  }
}
