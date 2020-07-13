import { Browser, Page } from 'puppeteer';
import { DeploymentFormWrapper } from './helpers/deployments/DeploymentFormWrapper';
import { DeploymentWrapper } from './helpers/deployments/DeploymentWrapper';
import { launchBrowser } from './launchBrowser';

export function openApp({ debug = false } = {}): TestEnvironment {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    const launchResult = await launchBrowser(debug);
    browser = launchResult.browser;
    page = launchResult.page;
  });

  afterAll(async () => {
    await browser.close();
  });

  return {
    page: () => page,
    deployment: (index) => new DeploymentWrapper(page, index),
    deploymentForm: () => new DeploymentFormWrapper(page),
  };
}

export interface TestEnvironment {
  page(): Page;
  deployment(index: number): DeploymentWrapper;
  deploymentForm(): DeploymentFormWrapper;
}
