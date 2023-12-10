import {describe} from 'vitest';
import {makeFakeFilmCard} from '../../mocks/mock-data.ts';
import {render, screen} from '@testing-library/react';
import Overview from './overview';

describe('Component: Overview', () => {
  it('should render correct', () => {
    const filmCard = makeFakeFilmCard();

    render(<Overview filmCard={filmCard} />);

    expect(screen.queryByText(`Director: ${filmCard.director}`)).toBeInTheDocument();
    expect(screen.queryByText(`${filmCard.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.queryByText(filmCard.description)).toBeInTheDocument();
  });
});
