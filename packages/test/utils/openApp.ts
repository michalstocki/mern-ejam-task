import puppeteer, { Browser, LaunchOptions, Page } from 'puppeteer';

const APP_URL:string = 'http://127.0.0.1:5000';
const APP_READY_SELECTOR:string = '.jumbotron';

const debugOptions:LaunchOptions = {
  headless: false,
  slowMo: 20,
};

export function openApp({ debug = false } = {}):TestEnvironment {

  let browser:Browser;
  let page:Page;

  beforeAll(async () => {
    const options:LaunchOptions = debug ? debugOptions : {};
    browser = await puppeteer.launch(options);
    const pages:Page[] = await browser.pages();
    page = pages[0];
    await page.goto(APP_URL);
    await page.waitForSelector(APP_READY_SELECTOR);
  });

  afterAll(async () => {
    await browser.close();
  });

  return {
    page: () => page,
  };
}

export interface TestEnvironment {
  page():Page;
}
