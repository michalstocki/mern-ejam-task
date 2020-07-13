import { Document, Model } from 'mongoose';
import {
  Deployment,
  DeploymentBase,
} from '../../../../types/deployments/Deployment';
import { getDeploymentModel } from './getDeploymentModel';

export async function createDeployment(
  deploymentData: DeploymentBase
): Promise<Deployment> {
  const Deployment: Model<Document> = getDeploymentModel();
  const deployment = new Deployment(deploymentData);
  await deployment.save();
  return deployment.toObject({ versionKey: false });
}
