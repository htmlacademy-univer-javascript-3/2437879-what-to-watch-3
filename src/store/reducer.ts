import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, Genre, ShowFilmsCount} from '../const';
import {FilmType, PromoFilmType, FilmCardType} from '../types/films';
import {CommentType} from '../types/users';
import {
  addShowedFilms,
  loadFilms,
  loadPromoFilm,
  requireAuthorization,
  setActiveGenre,
  setError,
  setGenres,
  setUserImage,
  loadFilm,
  loadMyList,
  loadComments,
  addComment,
  loadMoreLikeThis,
} from './action';

type initialStateProps = {
  films: FilmType[];
  filmsByGenre: FilmType[];
  promoFilm: PromoFilmType | null;
  genres: Genre[];
  activeGenre: Genre;
  filmsCount: number;
  authorizationStatus: AuthorizationStatus;
  userImage: string;
  error: string | null;
  filmCard: FilmCardType | null;
  moreLikeThis: FilmType[];
  comments: CommentType[];
  myList: FilmType[];
}

const initialState: initialStateProps = {
  films: [],
  filmsByGenre: [],
  promoFilm: null,
  genres: [],
  activeGenre: Genre.All,
  filmsCount: ShowFilmsCount,
  authorizationStatus: AuthorizationStatus.Unknown,
  userImage: '',
  error: null,
  filmCard: null,
  moreLikeThis: [],
  comments: [],
  myList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;

      if (state.activeGenre === Genre.All) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter((film) =>
          film.genre === state.activeGenre);
      }
      state.filmsCount = state.filmsByGenre.length > ShowFilmsCount
        ? ShowFilmsCount
        : state.filmsByGenre.length;
    })
    .addCase(setGenres, (state, action) => {
      state.genres = action.payload;
    })
    .addCase(addShowedFilms, (state) => {
      state.filmsCount =
        state.filmsByGenre.length > state.filmsCount + ShowFilmsCount
          ? state.filmsCount + ShowFilmsCount
          : state.filmsByGenre.length;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filmsByGenre = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserImage, (state, action) => {
      state.userImage = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.filmCard = action.payload;
    })
    .addCase(loadMoreLikeThis, (state, action) => {
      state.moreLikeThis = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments = [...state.comments, action.payload];
    })
    .addCase(loadMyList, (state, action) => {
      state.myList = action.payload;
    });
});

export {reducer};
