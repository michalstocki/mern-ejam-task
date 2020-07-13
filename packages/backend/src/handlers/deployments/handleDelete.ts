import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import { deleteDeploymentById } from '../../dataAccess/deployments/deleteDeploymentById';

export async function handleDelete(
  request: Request<{ id: string }, {}>,
  response: Response<{}>
): Promise<void> {
  await deleteDeploymentById(request.params.id);
  return response.status(OK).end();
}
