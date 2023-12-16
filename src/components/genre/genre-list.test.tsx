import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withStore} from '../../mocks/mock-components.tsx';
import {makeFakeStore} from '../../mocks/mock-data.ts';
import GenreList from './genre-list';
import {NameSpace} from '../../const.ts';
import {filmsSliceProps} from '../../services/films-slice/films-slice';

describe('Component: GenreList', () => {
  it('should render correct', () => {
    const {withStoreComponent, mockStore} = withStore(<GenreList />, makeFakeStore());
    const filmsSlice = mockStore.getState()[NameSpace.Films] as filmsSliceProps;

    render(withStoreComponent);

    expect(screen.getAllByRole('listitem')).toHaveLength(filmsSlice.genres.length);
  });
});
