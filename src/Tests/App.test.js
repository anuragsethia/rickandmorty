import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders the Header component', () => {
  render(<App />);
  expect(screen.getByText('Rick & Morty Profiles')).toBeInTheDocument();
});
