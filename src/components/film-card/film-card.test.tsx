import {render, screen} from '@testing-library/react';
import FilmCard from './film-card';
import {makeFakeFilm} from '../../mocks/mock-data.ts';
import {withHistory} from '../../mocks/mock-components.tsx';

describe('Component: FilmCard', () => {
  it('should render correct', () => {
    const mockFilm = makeFakeFilm();
    const activeFilm = 'unknown';
    const onMouseOver = vi.fn();
    const onMouseOut = vi.fn();
    const componentWithHistory = withHistory(
      <FilmCard
        promoFilm={mockFilm}
        activeFilm={activeFilm}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
    );

    render(componentWithHistory);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });
});
