import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../const';
import {FilmType, PromoFilmType} from '../types/films';

export const setActiveGenre = createAction<Genre>('setActiveGenre');
export const setGenres = createAction<Genre[]>('genre/setGenres');
export const addShowedFilms = createAction('films/addShowedFilms');
export const loadFilms = createAction<FilmType[]>('films/loadFilms');
export const loadPromoFilm = createAction<PromoFilmType>('films/loadPromoFilm');
