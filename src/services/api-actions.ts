import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute, FilmStatus} from '../const';
import {FilmType, PromoFilmType, FilmCardType} from '../types/films';
import {AppDispatch, State} from '../store/types';
import {UserFormValues, AuthInfo, CommentType, ImageUrl} from '../types/users';
import {removeToken, saveToken} from './token';

export const fetchFilmsAction = createAsyncThunk<
  FilmType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const {data} = await api.get<FilmType[]>(ApiRoute.Films());
  return data;
});

export const fetchPromoFilmAction = createAsyncThunk<
  PromoFilmType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { extra: api }) => {
  const {data} = await api.get<PromoFilmType>(ApiRoute.Promo());
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  {
    filmCard: FilmCardType;
    comments: CommentType[];
    moreLikeThis: FilmType[];
  },
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmData', async (id, { extra: api }) => {
  const [{ data: filmCard }, { data: comments }, { data: moreLikeThis }] =
    await Promise.all([
      api.get<FilmCardType>(ApiRoute.Film(id)),
      api.get<CommentType[]>(ApiRoute.Comments(id)),
      api.get<FilmType[]>(ApiRoute.Similar(id)),
    ]);
  return {filmCard, comments, moreLikeThis};
});

export const sendComment = createAsyncThunk<
  CommentType,
  {
    id: string;
    rating: number;
    comment: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/sendComment', async ({ id, rating, comment }, { extra: api }) => {
  const {data} = await api.post<CommentType>(ApiRoute.Comments(id), {
    rating: rating,
    comment: comment,
  });
  return data;
});

export const fetchMyList = createAsyncThunk<
  FilmType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchMyList', async (_arg, { extra: api }) => {
  const {data} = await api.get<FilmType[]>(ApiRoute.Favorite());
  return data;
});

export const setFilmStatus = createAsyncThunk<
    FilmCardType,
  {
    id: string;
    filmStatus: FilmStatus;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/setFilmStatus', async ({ id, filmStatus }, { extra: api }) => {
  const {data} = await api.post<FilmCardType>(
    ApiRoute.SetFilmStatus(id, filmStatus),
  );
  return data;
});

export const login = createAsyncThunk<
  ImageUrl,
  UserFormValues,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async (form, { extra: api }) => {
  const {data} = await api.post<AuthInfo>(ApiRoute.Login(), form);
  saveToken(data.token);
  return data.avatarUrl;
});

export const logOut = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout',async (_arg, { extra: api }) => {
  await api.delete(ApiRoute.Logout());
  removeToken();
});

export const checkAuth = createAsyncThunk<
  ImageUrl,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('user/checkAuthorization', async (_arg, { extra: api }) => {
  const {data} = await api.get<AuthInfo>(ApiRoute.Login());
  return data.avatarUrl;
});
