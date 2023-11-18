import {State} from '../../store/types';
import {CommentType} from '../../types/users';
import {Genre} from '../../const';
import {FilmType, FilmCardType, PromoFilmType} from '../../types/films';

export const getFilms = (state: State): FilmType[] => state.Films.films;
export const getPromoFilm = (state: State): PromoFilmType | null =>
  state.Films.promoFilm;
export const getFilmCard = (state: State): FilmCardType | null =>
  state.Films.filmCard;
export const getMoreLikeThis = (state: State): FilmType[] =>
  state.Films.moreLikeThis;
export const getComments = (state: State): CommentType[] =>
  state.Films.comments;
export const getMyList = (state: State): FilmType[] => state.Films.myList;
export const getGenres = (state: State): Genre[] => state.Films.genres;
export const getActiveGenre = (state: State): Genre => state.Films.activeGenre;
export const hasError = (state: State): boolean => state.Films.hasError;
export const checkDataLoading = (state: State): boolean =>
  state.Films.isDataLoading;
