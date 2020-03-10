import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Catch the train component', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Catch the train/i);
  expect(titleElement).toBeInTheDocument();
});
