import { Document, model, Model } from 'mongoose';
import { Deployment } from '../../../../types/deployments/Deployment';
import { DeploymentSchema } from './DeploymentSchema';

export function getDeploymentModel(): Model<Document> {
  return model('Deployment', DeploymentSchema);
}
