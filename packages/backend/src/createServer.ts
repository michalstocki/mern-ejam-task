import express, { Express } from 'express';
import path from 'path';
import { Config } from '../config';
import { connectMongo } from './dataAccess/connectMongo';
import { handleCreate } from './handlers/deployments/handleCreate';
import { handleGetAll } from './handlers/deployments/handleGetAll';

export async function createServer(config: Config): Promise<Express> {
  await connectMongo(config);

  return express()
    .use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))
    .use(express.json())
    .get('/deployments', handleGetAll)
    .post('/deployments', handleCreate);
}
