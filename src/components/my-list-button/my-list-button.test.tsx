import { describe } from 'vitest';
import { makeFakeFilmCard, makeFakeStore } from '../../mocks/mock-data.ts';
import { withStore } from '../../mocks/mock-components.tsx';
import MyListButton from './my-list-button.tsx';
import { render, screen } from '@testing-library/react';
import { NameSpace } from '../../const.ts';
import {filmsSliceProps} from '../../services/films/films-slice';

describe('Component: MyListButton', () => {
  it('should render correct', () => {
    const mockFilmCard = makeFakeFilmCard();
    const { withStoreComponent, mockStore } = withStore(<MyListButton filmCard={mockFilmCard} />, makeFakeStore());
    const filmsSlice = mockStore.getState()[NameSpace.Films] as filmsSliceProps;

    render(withStoreComponent);

    expect(screen.getByText(String(filmsSlice.myList.length))).toBeInTheDocument();
  });
});
