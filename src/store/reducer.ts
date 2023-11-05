import {createReducer} from '@reduxjs/toolkit';
import {films} from '../mocks/films';
import {Genre} from '../const';
import {FilmCardType} from '../types/films';
import {getFilmsByGenre, setActiveGenre, setGenres} from './action';

type initialStateProps = {
  films: FilmCardType[];
  genres: Genre[];
  activeGenre: Genre;
}

const initialState: initialStateProps = {
  films: films,
  genres: [],
  activeGenre: Genre.All,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setActiveGenre, (state, action) => {
      state.activeGenre = action.payload;
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
    });
});


export {reducer};
