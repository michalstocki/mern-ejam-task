import { getDeploymentModel } from './getDeploymentModel';

export async function deleteDeploymentById(id: string): Promise<any> {
  const Deployment = getDeploymentModel();
  return Deployment.deleteOne({ _id: id });
}
