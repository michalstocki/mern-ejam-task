import express, { Express, Request, Response } from 'express';
import path from "path";
import { handleGetAll } from './handlers/deployments/handleGetAll';

export function createServer():Express {
  return express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req:Request, res:Response) => res.render('pages/index'))
    .get('/deployments', (req:Request, res:Response) => handleGetAll(req, res))
}
