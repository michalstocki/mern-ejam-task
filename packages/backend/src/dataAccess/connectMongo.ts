import mongoose, { Connection } from 'mongoose';
import { Config } from '../../config';

export async function connectMongo(config: Config): Promise<Connection> {
  await mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
}
