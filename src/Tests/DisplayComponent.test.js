import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DisplayComponent } from '../Components/DisplayComponent';

describe('DisplayComponent', () => {
  const characterInfo = [
    {
      name: 'Rick',
      species: 'Human',
      gender: 'Male',
      status: 'Alive',
      image: 'rick.png',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      episode: ['episode1', 'episode2'],
    },
  ];
  const episodes = {
    episode1: { name: 'Episode 1', episode: 'S01E01', air_date: '2021-01-01' },
    episode2: { name: 'Episode 2', episode: 'S01E02', air_date: '2021-01-08' },
  };
  const locations = {
    Earth: { name: 'Earth', dimension: 'Dimension C-137', residents: ['Rick'] },
  };

  test('renders character cards with correct information', () => {
    render(
      <DisplayComponent characterInfo={characterInfo} episodes={episodes} locations={locations} />
    );

    const characterName = screen.getByText('Rick');
    expect(characterName).toBeInTheDocument();

    const species = screen.getByText('Human');
    expect(species).toBeInTheDocument();

    const gender = screen.getByText('Male');
    expect(gender).toBeInTheDocument();

    const status = screen.getByText('Alive');
    expect(status).toBeInTheDocument();

    const episodeButton = screen.getByText('Appeared in Episodes');
    expect(episodeButton).toBeInTheDocument();

    const locationButton = screen.getByText('Location Info');
    expect(locationButton).toBeInTheDocument();
  });
});
