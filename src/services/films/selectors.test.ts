import {describe, expect} from 'vitest';
import {Genre, NameSpace} from '../../const.ts';
import {
  makeFakeComments,
  makeFakeFilmCard,
  makeFakeFilmsList,
  makeFakeGenres,
  makeFakePromoFilm,
} from '../../mocks/mock-data.ts';
import {
  getActiveGenre,
  getComments,
  getFilmCard,
  getFilms,
  getGenres,
  getIsDataLoading,
  getMoreLikeThis,
  getMyList,
  getPromoFilm,
} from './selectors.ts';

describe('FilmsSlice selectors', () => {
  const state = {
    [NameSpace.Films]: {
      hasError: false,
      isDataLoading: false,
      films: makeFakeFilmsList(),
      promoFilm: makeFakePromoFilm(),
      filmCard: makeFakeFilmCard(),
      moreLikeThis: makeFakeFilmsList(),
      comments: makeFakeComments(),
      myList: makeFakeFilmsList(),
      genres: makeFakeGenres(),
      activeGenre: Genre.All,
    },
  };

  it('should return films list from state', () => {
    const { films } = state[NameSpace.Films];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should return promo film from state', () => {
    const { promoFilm } = state[NameSpace.Films];
    const result = getPromoFilm(state);
    expect(result).toEqual(promoFilm);
  });

  it('should return film card from state', () => {
    const { filmCard } = state[NameSpace.Films];
    const result = getFilmCard(state);
    expect(result).toEqual(filmCard);
  });

  it('should return more like this list from state', () => {
    const { moreLikeThis } = state[NameSpace.Films];
    const result = getMoreLikeThis(state);
    expect(result).toEqual(moreLikeThis);
  });

  it('should return comments list from state', () => {
    const { comments } = state[NameSpace.Films];
    const result = getComments(state);
    expect(result).toEqual(comments);
  });

  it('should return my list from state', () => {
    const { myList } = state[NameSpace.Films];
    const result = getMyList(state);
    expect(result).toEqual(myList);
  });

  it('should return genre from state', () => {
    const { genres } = state[NameSpace.Films];
    const result = getGenres(state);
    expect(result).toEqual(genres);
  });

  it('should return activeGenre from state', () => {
    const { activeGenre } = state[NameSpace.Films];
    const result = getActiveGenre(state);
    expect(result).toBe(activeGenre);
  });

  it('should return is loading from state', () => {
    const { isDataLoading } = state[NameSpace.Films];
    const result = getIsDataLoading(state);

    expect(result).toEqual(isDataLoading);
  });
});
