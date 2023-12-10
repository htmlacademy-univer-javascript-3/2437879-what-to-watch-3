import {makeFakeFilmsList} from '../../mocks/mock-data.ts';
import {withHistory} from '../../mocks/mock-components.tsx';
import {FilmCards} from './film-cards';
import {render, screen} from '@testing-library/react';

describe('Component: FilmCards', () => {
  it('should render correct', () => {
    const mockFilms = makeFakeFilmsList();
    const filmsCount = 5;
    const componentWithHistory = withHistory(
      <FilmCards films={mockFilms} filmsCount={filmsCount} />
    );

    render(componentWithHistory);

    expect(screen.getByText(mockFilms[0].name)).toBeInTheDocument();
    expect(screen.getAllByTestId('film')).toHaveLength(5);
  });
});
