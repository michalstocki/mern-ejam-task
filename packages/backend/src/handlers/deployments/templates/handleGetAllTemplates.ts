import { Request, Response } from 'express';
import {
  DeploymentTemplate,
  deploymentTemplates,
} from '../../../../../types/deployments/DeploymentTemplate';

export async function handleGetAllTemplates(
  request: Request,
  response: Response
): Promise<Response<DeploymentTemplate[]>> {
  return response.json(deploymentTemplates);
}
