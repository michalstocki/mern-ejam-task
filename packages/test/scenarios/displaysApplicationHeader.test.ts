import { openApp } from '../utils/openApp';

describe('displaysApplicationHeader', () => {
  const { page } = openApp();

  it('renders the application header text correctly', async () => {
    const headerContent: string = await page().$eval(
      '.jumbotron .container h1',
      (el) => el.innerHTML
    );

    expect(headerContent).toEqual('Getting Started on Heroku with Node.js');
  });
});
