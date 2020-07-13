import React from 'react';
import { useDispatch } from 'react-redux';
import { DeploymentJSON } from '../../../../types/deployments/Deployment';
import { deleteDeployment } from '../../redux/deployments/actions/deleteDeployment';

export interface DeploymentItemProps extends DeploymentJSON {}

export function DeploymentItem({
  templateName,
  url,
  version,
  deployedAt,
  _id,
}: DeploymentItemProps) {
  const dispatch = useDispatch();
  const datetime: string = new Date(deployedAt).toLocaleString();

  return (
    <li className="deployments__item">
      <div className="deployments__name">{templateName}</div>
      <div className="deployments__url">{url}</div>
      <div className="deployments__version">{version}</div>
      <div className="deployments__time">{datetime}</div>
      <button
        onClick={() => dispatch(deleteDeployment(_id!))}
        className="deployments__delete"
      >
        delete
      </button>
    </li>
  );
}
