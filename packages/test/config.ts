import { Config } from 'mern-ejam-task-backend/config';

const e2eTestDatabaseName: string = 'test-e2e';

export const e2eTestAppConfig: Config = {
  mongoURI: `mongodb://localhost:27017/${e2eTestDatabaseName}`,
  port: 5000,
};
