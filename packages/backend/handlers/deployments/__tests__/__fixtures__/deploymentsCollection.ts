import { DeploymentSchema } from '../../../../dataAccess/deployments/DeploymentSchema';
import { MongoFixture } from '../../../../testUtils/MongoFixture';
import { Deployment } from '../../../../types/deployments/Deployment';

const modelName = 'Deployment';
const schema = DeploymentSchema;

export const deploymentsCollection: Array<MongoFixture<Deployment>> = [
  {
    data: {
      deployedAt: new Date(2020, 3, 15),
      templateName: 'Natural One',
      url: 'https://naturalone.heroku.com/apps/mern-ejam-task',
      version: '2.0.0',
    },
    modelName,
    schema,
  },
  {
    data: {
      deployedAt: new Date(2020, 7, 9),
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.0.0',
    },
    modelName,
    schema,
  },
  {
    data: {
      deployedAt: new Date(2020, 7, 10),
      templateName: 'Techno 01',
      url: 'https://techno01.heroku.com/apps/mern-ejam-task',
      version: '1.1.1',
    },
    modelName,
    schema,
  },
];
