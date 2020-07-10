import {Request, Response} from 'express';
import { getAll } from '../../dataAccess/deployments/getAll';
import { Deployment } from '../../types/deployments/Deployment';

export async function handleGetAll(request:Request, response:Response):Promise<Response<Deployment[]>> {
  const allDeployments = await getAll();
  return response.json(allDeployments);
}
