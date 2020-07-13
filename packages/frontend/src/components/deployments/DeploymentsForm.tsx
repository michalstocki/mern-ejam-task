import React, { ChangeEvent, FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeploymentBase } from '../../../../types/deployments/Deployment';
import { submitDeploymentForm } from '../../redux/deployments/actions/submitDeploymentForm';
import { updateDeploymentForm } from '../../redux/deployments/actions/updateDeploymentForm';
import { DeploymentsFormState } from '../../redux/deployments/reducers/deployments';
import { State } from '../../redux/store';

export function DeploymentsForm() {
  const formState = useSelector<State, DeploymentsFormState>(
    (state) => state.deployments.formFields
  );
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(submitDeploymentForm());
    },
    [dispatch]
  );

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = e.target.name as keyof DeploymentBase;
      const value = e.target.value;
      dispatch(updateDeploymentForm(name, value));
    },
    [dispatch]
  );

  return (
    <form onSubmit={onSubmit} className="deployments-form">
      <label>
        <div>Template name</div>
        <select
          value={formState.templateName.value}
          name="templateName"
          onChange={onInputChange}
        >
          {formState.templateName.availableValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        <div>Version</div>
        <select
          value={formState.version.value}
          name="version"
          onChange={onInputChange}
        >
          {formState.version.availableValues.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <label>
        <div>URL</div>
        <input
          type="url"
          value={formState.url.value}
          name="url"
          onChange={onInputChange}
        />
      </label>
      <input type="submit" value="Deploy" />
    </form>
  );
}
