import React from 'react';
import { DeploymentJSON } from '../../../../types/deployments/Deployment';

export interface DeploymentItemProps extends DeploymentJSON {}

export function DeploymentItem({
  templateName,
  url,
  version,
  deployedAt,
}: DeploymentItemProps) {
  const datetime: string = new Date(deployedAt).toLocaleString();

  return (
    <li className="deployments__item">
      <div className="deployments__name">{templateName}</div>
      <div className="deployments__url">{url}</div>
      <div className="deployments__version">{version}</div>
      <div className="deployments__time">{datetime}</div>
    </li>
  );
}
