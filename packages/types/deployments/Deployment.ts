export interface DeploymentBase {
  url: string;
  templateName: string;
  version: string;
}

export interface Deployment extends DeploymentBase {
  deployedAt: Date;
  _id?: string;
}

export interface DeploymentJSON extends DeploymentBase {
  deployedAt: string;
  _id?: string;
}
