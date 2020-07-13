import mongoose, { Connection } from 'mongoose';
import { Config } from '../../config';

export async function connectMongo(config: Config): Promise<Connection> {
  if (mongoose.connection.readyState === mongoose.STATES.connected) {
    return mongoose.connection;
  }

  await mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
}
