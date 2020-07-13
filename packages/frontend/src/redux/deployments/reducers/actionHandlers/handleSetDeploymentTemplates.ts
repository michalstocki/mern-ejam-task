import { SetDeploymentTemplatesAction } from '../../actions/setDeploymentTemplates';
import { DeploymentsState, TemplatesState } from '../deployments';

export function handleSetDeploymentTemplates(
  state: DeploymentsState,
  action: SetDeploymentTemplatesAction
): DeploymentsState {
  return {
    ...state,
    templates: action.templates.reduce<TemplatesState>(
      (templates, template) => {
        templates[template.name] = template;

        return templates;
      },
      {}
    ),
    formFields: {
      ...state.formFields,
      templateName: {
        ...state.formFields.templateName,
        availableValues: action.templates.map((t) => t.name),
      },
    },
  };
}
