import { Schema } from 'mongoose';
import { Deployment } from '../../types/deployments/Deployment';

export const DeploymentSchema: Schema<Deployment> = new Schema({
  url: String,
  templateName: String,
  version: String,
  deployedAt: { type: Date, default: Date.now },
});
