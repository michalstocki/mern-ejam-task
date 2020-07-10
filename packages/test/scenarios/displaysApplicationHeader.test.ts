import { openApp } from '../utils/openApp';

describe('displaysApplicationHeader', () => {
  const { page } = openApp();

  it('renders the application header text correctly', async () => {
    const headerContent: string = await page().$eval(
      '.App .App-header h1',
      (el) => el.innerHTML
    );

    expect(headerContent).toEqual('Deployments');
  });
});
