import { DeploymentTemplate } from '../../../../../types/deployments/DeploymentTemplate';

export interface SetDeploymentTemplatesAction {
  type: 'SetDeploymentTemplates';
  templates: DeploymentTemplate[];
}

export function setDeploymentTemplates(
  templates: DeploymentTemplate[]
): SetDeploymentTemplatesAction {
  return {
    templates,
    type: 'SetDeploymentTemplates',
  };
}
