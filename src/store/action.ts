import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../const';

export const setActiveGenre = createAction<Genre>('setActiveGenre');
export const setGenres = createAction<Genre[]>('setGenres');
export const getFilmsByGenre = createAction('filmsByGenre');
export const addShowedFilms = createAction('addShowedFilms');
