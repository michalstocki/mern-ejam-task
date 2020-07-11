import { Express } from 'express';
import { Server } from 'http';
import mongoose, { Schema } from 'mongoose';
import { Config } from '../src/config';
import { createServer } from '../src/createServer';
import { closeServer } from './closeServer';
import { getJestWorkerId } from './getJestWorkerId';
import { loadMongoFixtures } from './loadMongoFixtures';
import { MongoFixture } from './MongoFixture';

export function createTestEnv(
  fixtures: Array<MongoFixture<any>> = []
): BackendTestEnv {
  let app: Express;
  let server: Server;
  const jestWorkerId: number = getJestWorkerId();
  const dbName: string = `test-${jestWorkerId}`;

  const config: Config = {
    port: 5000 + jestWorkerId,
    mongoURI: `mongodb://localhost:27017/${dbName}`,
  };

  beforeEach(async () => {
    try {
      await loadMongoFixtures(config, fixtures);
      app = await createServer(config);
      server = app.listen(config.port);
    } catch (e) {
      console.error(e);
    }
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await closeServer(server);
  });

  return {
    app: () => app,
    async getCollection<T>(name: string, schema: Schema<T>): Promise<T[]> {
      const docs = await mongoose.model(name, schema).find().exec();
      return docs.map((d) => d.toObject());
    },
  };
}

export interface BackendTestEnv {
  app(): Express;

  getCollection<T>(name: string, schema: Schema<T>): Promise<T[]>;
}
