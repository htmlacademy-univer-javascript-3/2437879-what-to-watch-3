import {createAction} from '@reduxjs/toolkit';
import {Genre, AuthorizationStatus} from '../const';
import {FilmType, PromoFilmType, FilmCardType} from '../types/films';
import {CommentType} from '../types/users';

export const setActiveGenre = createAction<Genre>('genre/setActiveGenre');
export const setGenres = createAction<Genre[]>('genre/setGenres');
export const addShowedFilms = createAction('films/addShowedFilms');
export const loadFilms = createAction<FilmType[]>('films/loadFilms');
export const loadFilm = createAction<FilmCardType | null>('films/loadFilm');
export const loadPromoFilm = createAction<PromoFilmType>('films/loadPromoFilm');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserImage = createAction<string>('user/image');
export const setError = createAction<string | null>('films/error');
export const loadComments = createAction<CommentType[]>('films/loadComments');
export const loadMyList = createAction<FilmType[]>('films/loadMyList');
export const addComment = createAction<CommentType>('films/sendComment');
export const loadMoreLikeThis = createAction<FilmType[]>('films/loadMoreLikeThis');
