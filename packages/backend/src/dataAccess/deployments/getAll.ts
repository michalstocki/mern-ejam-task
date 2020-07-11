import { Document, Model } from 'mongoose';
import { DeploymentJSON } from '../../../../types/deployments/Deployment';
import { getDeploymentModel } from './getDeploymentModel';

export async function getAll(): Promise<DeploymentJSON[]> {
  const Deployment: Model<Document> = getDeploymentModel();
  const documents: Document[] = await Deployment.find()
    .sort({ deployedAt: 'desc' })
    .exec();
  return documents.map((d) => d.toObject({ versionKey: false }));
}
