import React from 'react';
import './App.css';
import { DeploymentsForm } from './components/deployments/DeploymentsForm';
import { DeploymentsList } from './components/deployments/DeploymentsList';

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Deployments</h1>
        <DeploymentsForm />
        <DeploymentsList />
      </header>
    </div>
  );
}
