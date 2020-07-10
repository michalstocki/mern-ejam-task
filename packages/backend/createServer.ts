import express, { Express, Request, Response } from 'express';
import path from 'path';
import { handleGetAll } from './handlers/deployments/handleGetAll';

export function createServer(): Express {
  return express()
    .use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
    .get('/deployments', (req: Request, res: Response) =>
      handleGetAll(req, res)
    );
}
