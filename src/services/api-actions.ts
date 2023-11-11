import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import {ApiRoute, AuthInfo, AuthorizationStatus} from '../const';
import {FilmType, PromoFilmType} from '../types/films';
import {loadFilms, loadPromoFilm, setError, requireAuthorization, setUserImage} from '../store/action';
import {AppDispatch, State} from '../store/types';
import {UserFormValues} from '../pages/sign-in-page/sign-in-page';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<FilmType[]>(ApiRoute.Films())
    .then((res) => dispatch(loadFilms(res.data)))
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const fetchPromoFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<PromoFilmType>(ApiRoute.Promo())
    .then((res) => dispatch(loadPromoFilm(res.data)))
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const login = createAsyncThunk<
  void,
  UserFormValues,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async (form, { dispatch, extra: api }) => {
  await api
    .post<UserFormValues, { data: AuthInfo }>(ApiRoute.Login(), form)
    .then((res) => res.data)
    .then((data) => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserImage(data.avatarUrl));
    })
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<AuthInfo>(ApiRoute.Login())
    .then(() => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    })
    .catch((err: AxiosError) => {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setError(err.message));
    });
});
