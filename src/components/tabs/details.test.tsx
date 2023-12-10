import {describe} from 'vitest';
import {render, screen} from '@testing-library/react';
import {makeFakeFilmCard} from '../../mocks/mock-data.ts';
import Details from './details';
describe('Component: Details', () => {
  it('should render correct', () => {
    const filmCard = makeFakeFilmCard();
    render(<Details filmCard={filmCard} />);

    expect(screen.getByText(filmCard.director)).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText(filmCard.genre)).toBeInTheDocument();
    expect(screen.getByText(filmCard.released)).toBeInTheDocument();
  });
});
