import express, { Express, Request, Response } from 'express';
import path from 'path';
import { Config } from './config';
import { connectMongo } from './dataAccess/connectMongo';
import { handleGetAll } from './handlers/deployments/handleGetAll';

export async function createServer(config: Config): Promise<Express> {
  await connectMongo(config);

  return express()
    .use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))
    .get('/deployments', (req: Request, res: Response) =>
      handleGetAll(req, res)
    );
}
