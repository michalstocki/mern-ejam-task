import defaults from 'lodash.defaults';

const localDatabaseName: string = 'mern-ejam-task';

const defaultConfigValues: Partial<Config> = {
  mongoURI: process.env.MONGODB_URI,
  port: process.env.PORT,
};

const fallbackConfigValues: Config = {
  mongoURI: `mongodb://localhost:27017/${localDatabaseName}`,
  port: 5000,
};

export interface Config {
  port: number | string;
  mongoURI: string;
}

export const config: Config = defaults(
  {},
  defaultConfigValues,
  fallbackConfigValues
);
