import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LangBuddy app', () => {
  render(<App />);
  const titleElement = screen.getByText(/LangBuddy/i);
  expect(titleElement).toBeInTheDocument();
});
