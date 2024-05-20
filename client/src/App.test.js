import { render, screen } from '@testing-library/react';
import App from './App';
import { useContext } from 'react';
import { ActorContext } from './contexts/actorContext';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const {actorState} = useContext(ActorContext)
console.log(actorState.actor)