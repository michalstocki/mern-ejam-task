import { Browser, Page } from 'puppeteer';
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
  };
}

export interface TestEnvironment {
  page(): Page;
}
