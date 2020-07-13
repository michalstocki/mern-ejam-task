import { Express } from 'express';
import { Server } from 'http';
import mongoose, { Schema } from 'mongoose';
import { Config } from '../config';
import { createServer } from '../src/createServer';
import { connectMongo } from '../src/dataAccess/connectMongo';
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

  beforeAll(async () => {
    try {
      await connectMongo(config);
      app = await createServer(config);
      server = app.listen(config.port);
    } catch (e) {
      console.error(e);
    }
  });

  beforeEach(async () => {
    try {
      await loadMongoFixtures(fixtures);
    } catch (e) {
      console.error(e);
    }
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await closeServer(server);
    await mongoose.disconnect();
  });

  return {
    app: () => app,
    async getCollection<T>(
      name: string,
      schema: Schema<T>,
      sortBy: SortArg
    ): Promise<T[]> {
      const docs = await mongoose
        .model(name, schema)
        .find()
        .sort(sortBy)
        .exec();
      return docs.map((d) => d.toObject({ versionKey: false }));
    },
  };
}

export interface BackendTestEnv {
  app(): Express;

  getCollection<T>(
    name: string,
    schema: Schema<T>,
    sortBy: SortArg
  ): Promise<T[]>;
}

type SortArg = { [property: string]: 'asc' | 'desc' };
