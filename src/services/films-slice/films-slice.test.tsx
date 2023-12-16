import {describe, expect, it} from 'vitest';
import {dropError, filmsSlice, setActiveGenre, filmsSliceProps} from './films-slice.ts';
import {Genre} from '../../const.ts';

describe('FilmsSlice', () => {
  const baseState: filmsSliceProps = {
    hasError: false,
    isDataLoading: false,
    films: [],
    promoFilm: null,
    filmCard: null,
    moreLikeThis: [],
    comments: [],
    myList: [],
    genres: [],
    activeGenre: Genre.All,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const result = filmsSlice.reducer(baseState, emptyAction);

    expect(result).toEqual(baseState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const result = filmsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(baseState);
  });

  it('should set new active genre with "setActiveGenre" action', () => {
    const newGenre = Genre.New;
    const expectedState = {...baseState, activeGenre: newGenre};
    const result = filmsSlice.reducer(undefined, setActiveGenre(newGenre));

    expect(result).toEqual(expectedState);
  });

  it('should drop error with "dropError" action', () => {
    const initialState = {...baseState, hasError: true};
    const expectedState = {...baseState, hasError: false};
    const result = filmsSlice.reducer(initialState, dropError());

    expect(result).toEqual(expectedState);
  });
});
