import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';

export function DeploymentsList() {
  const deployments = useSelector(getAllDeployments);
  console.log(deployments);
  return <div>{deployments.length}</div>;
}

function getAllDeployments(state: State) {
  const { byId, allIds } = state.deployments;

  return allIds.map((id) => byId[id]);
}
