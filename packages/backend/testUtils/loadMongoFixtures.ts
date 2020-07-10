import mongoose, { Document, Model } from 'mongoose';
import { Config } from '../config';
import { connectMongo } from '../dataAccess/connectMongo';
import { MongoFixture } from './MongoFixture';

export async function loadMongoFixtures(
  config: Config,
  fixtures: Array<MongoFixture<any>>
): Promise<any> {
  await connectMongo(config);

  return Promise.all(
    fixtures.reverse().map(({ modelName, data, schema }) => {
      const ModelConstructor: Model<Document> = mongoose.model(
        modelName,
        schema
      );
      const doc: Document = new ModelConstructor(data);
      return doc.save();
    })
  );
}
