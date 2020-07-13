import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import {
  Deployment,
  DeploymentBase,
} from '../../../../types/deployments/Deployment';
import { createDeployment } from '../../dataAccess/deployments/createDeployment';

export async function handleCreate(
  request: Request<{}, DeploymentBase>,
  response: Response<Deployment>
): Promise<Response<Deployment>> {
  const created = await createDeployment(request.body);
  return response.status(CREATED).json(created);
}
