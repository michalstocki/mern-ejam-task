import { Schema } from 'mongoose';

export interface MongoFixture<T> {
  schema: Schema<T>;
  modelName: string;
  data: T;
}
