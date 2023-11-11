import {createAction} from '@reduxjs/toolkit';
import {Genre, AuthorizationStatus} from '../const';
import {FilmType, PromoFilmType} from '../types/films';

export const setActiveGenre = createAction<Genre>('genre/setActiveGenre');
export const setGenres = createAction<Genre[]>('genre/setGenres');
export const addShowedFilms = createAction('films/addShowedFilms');
export const loadFilms = createAction<FilmType[]>('films/loadFilms');
export const loadPromoFilm = createAction<PromoFilmType>('films/loadPromoFilm');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserImage = createAction<string>('user/image');
export const setError = createAction<string | null>('films/error');
