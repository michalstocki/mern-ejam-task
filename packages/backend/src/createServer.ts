import express, { Express } from 'express';
import path from 'path';
import { Config } from '../config';
import { connectMongo } from './dataAccess/connectMongo';
import { handleCreate } from './handlers/deployments/handleCreate';
import { handleDelete } from './handlers/deployments/handleDelete';
import { handleGetAll } from './handlers/deployments/handleGetAll';
import { handleGetAllTemplates } from './handlers/deployments/templates/handleGetAllTemplates';

export async function createServer(config:Config):Promise<Express> {
  await connectMongo(config);

  let COOKIE_NAME = 'my-cookie';
  let COOKIE_VALUE = 'my-value';

  return express()
    .use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))
    .use(express.json())
    .get('/setCookie', (request, response) => {
      response.cookie(COOKIE_NAME, COOKIE_VALUE, {
        domain: 'mern-ejam-task.herokuapp.com',
        httpOnly: true
      });
      response.json('cookie Set');
    })
    .get('/cookieStatus', (request, response) => {
      response.setHeader('Content-Type', 'image/png');
      if (request.cookies && request.cookies[COOKIE_NAME] == COOKIE_VALUE) {
        response.setHeader('X-My-Cookie', 'found correct value');
        response.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'good.png'));
      } else {
        if (!request.cookies) {
          response.setHeader('X-My-Cookie', 'cookies object found');
        }
        response.setHeader('X-My-Cookie', 'no cookie found');
        response.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'bad.png'));
      }
    })
    .get('/deployments', handleGetAll)
    .post('/deployments', handleCreate)
    .delete('/deployments/:id', handleDelete)
    .get('/deployments/templates', handleGetAllTemplates);
}
