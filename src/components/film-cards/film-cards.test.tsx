import {makeFakeFilmsList} from '../../mocks/mock-data.ts';
import {withHistory} from '../../mocks/mock-components.tsx';
import {FilmCards} from './film-cards';
import {render, screen} from '@testing-library/react';

describe('Component: FilmCards', () => {
  it('should render correct', () => {
    const MOCK_FILMS = makeFakeFilmsList();
    const FILMS_COUNT = 5;
    const componentWithHistory = withHistory(
      <FilmCards films={MOCK_FILMS} filmsCount={FILMS_COUNT} />
    );

    render(componentWithHistory);

    expect(screen.getByText(MOCK_FILMS[0].name)).toBeInTheDocument();
    expect(screen.getAllByTestId('film')).toHaveLength(5);
  });
});
