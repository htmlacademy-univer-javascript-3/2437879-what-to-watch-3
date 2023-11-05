import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';
import {Genre, ShowFilmsCount, PromoFilm} from '../const';
import {FilmCardType, PromoFilmType} from '../types/films';
import {getFilmsByGenre, setActiveGenre, setGenres, addShowedFilms} from './action';

type initialStateProps = {
  films: FilmCardType[];
  promoFilm: PromoFilmType;
  genres: Genre[];
  activeGenre: Genre;
  filmsCount: number;
}

const initialState: initialStateProps = {
  films: films,
  promoFilm: PromoFilm,
  genres: [],
  activeGenre: Genre.All,
  filmsCount: ShowFilmsCount,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
      state.filmsCount = ShowFilmsCount;
    })
    .addCase(getFilmsByGenre, (state) => {
      if (state.activeGenre === Genre.All) {
        state.films = films;
      } else {
        state.films = films.filter((film) =>
          film.genre === state.activeGenre);
      }
    })
    .addCase(setGenres, (state, action) => {
      state.genres = action.payload;
    })
    .addCase(addShowedFilms, (state) => {
      state.filmsCount +=
        state.films.length > state.filmsCount + ShowFilmsCount
          ? state.filmsCount + ShowFilmsCount
          : state.films.length;
    });
});


export {reducer};
