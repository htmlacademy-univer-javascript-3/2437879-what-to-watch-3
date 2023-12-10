import {describe} from 'vitest';
import MoviePage from './movie-page.tsx';
import {withHistory, withStore} from '../../mocks/mock-components.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';
import {render, screen} from '@testing-library/react';

describe('Page: Movie', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<MoviePage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId('film')).toHaveLength(4);
  });
});
