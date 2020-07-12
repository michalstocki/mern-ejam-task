import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { DeploymentItem } from './DeploymentItem';

export function DeploymentsList() {
  const deployments = useSelector(getAllDeployments);
  return (
    <ul className="deployments">
      {deployments.map((deployment) => {
        return <DeploymentItem {...deployment} key={deployment._id} />;
      })}
    </ul>
  );
}

function getAllDeployments(state: State) {
  const { byId, allIds } = state.deployments;

  return allIds.map((id) => byId[id]);
}
