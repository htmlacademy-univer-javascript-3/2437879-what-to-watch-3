import {createReducer} from '@reduxjs/toolkit';
import {Genre, ShowFilmsCount} from '../const';
import {PromoFilmType, FilmType} from '../types/films';
import {setActiveGenre, setGenres, addShowedFilms, loadFilms, loadPromoFilm} from './action';

type initialStateProps = {
  films: FilmType[];
  filmsByGenre: FilmType[];
  promoFilm: PromoFilmType | null;
  genres: Genre[];
  activeGenre: Genre;
  filmsCount: number;
}

const initialState: initialStateProps = {
  films: [],
  filmsByGenre: [],
  promoFilm: null,
  genres: [],
  activeGenre: Genre.All,
  filmsCount: ShowFilmsCount,
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
    });
});


export {reducer};
