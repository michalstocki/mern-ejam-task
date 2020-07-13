import puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';
import { e2eTestAppConfig } from '../config';

const APP_URL: string = `http://127.0.0.1:${e2eTestAppConfig.port}`;
export const APP_READY_SELECTOR: string = '.App .deployments';

const defaultOptions: LaunchOptions = {
  args: ['--lang=en-US,en'],
};

const debugOptions: LaunchOptions = {
  ...defaultOptions,
  headless: false,
  slowMo: 20,
};

export async function launchBrowser(
  debug: boolean
): Promise<{ browser: Browser; page: Page }> {
  const options: LaunchOptions = debug ? debugOptions : defaultOptions;
  const browser: Browser = await puppeteer.launch(options);
  const pages: Page[] = await browser.pages();
  const page: Page = pages[0];

  await page.goto(APP_URL);
  await page.waitForSelector(APP_READY_SELECTOR);

  return { browser, page };
}
