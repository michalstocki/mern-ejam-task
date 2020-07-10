import { Deployment } from '../../types/deployments/Deployment';

export async function getAll(): Promise<Deployment[]> {
  return [
    {
      deployedAt: new Date(2020, 3, 15),
      templateName: 'Natural One',
      url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
      version: '2.0.0',
    },
    {
      deployedAt: new Date(2020, 7, 9),
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.0.0',
    },
    {
      deployedAt: new Date(2020, 7, 10),
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.1.1',
    },
  ];
}
