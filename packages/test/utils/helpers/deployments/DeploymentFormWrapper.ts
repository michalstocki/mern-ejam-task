import { Page } from 'puppeteer';
import { DeploymentBase } from '../../../../types/deployments/Deployment';

export class DeploymentFormWrapper {
  constructor(private page: Page) {}

  public async fillWithData(data: DeploymentBase): Promise<void> {
    return;
  }

  public async expectEmpty(): Promise<void> {
    return;
  }

  public async submit(): Promise<void> {
    return;
  }
}
