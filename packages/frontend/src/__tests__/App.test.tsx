import { render } from '@testing-library/react';
import React from 'react';
import { App } from '../App';

it('renders App header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Deployments/i);
  expect(linkElement).toBeInTheDocument();
});
