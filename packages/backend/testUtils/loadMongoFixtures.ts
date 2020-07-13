import mongoose, { Document, Model } from 'mongoose';
import { MongoFixture } from './MongoFixture';

export async function loadMongoFixtures(
  fixtures: Array<MongoFixture<any>>
): Promise<any> {
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
