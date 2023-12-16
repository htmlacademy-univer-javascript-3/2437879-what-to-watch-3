import { describe } from 'vitest';
import { makeFakeStore } from '../../mocks/mock-data.ts';
import { render, screen } from '@testing-library/react';
import { withStore } from '../../mocks/mock-components.tsx';
import Reviews from './reviews';
import {filmsSliceProps} from '../../services/films-slice/films-slice';
import { NameSpace } from '../../const.ts';

describe('Component: Reviews', () => {
  it('should render correct', () => {
    const {withStoreComponent, mockStore} = withStore(<Reviews />, makeFakeStore());
    const filmsSlice = mockStore.getState()[NameSpace.Films] as filmsSliceProps;

    render(withStoreComponent);

    expect(screen.getAllByTestId('review')).toHaveLength(filmsSlice.comments.length);
  });
});
