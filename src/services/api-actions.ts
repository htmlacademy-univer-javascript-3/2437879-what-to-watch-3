import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import {ApiRoute, AuthorizationStatus} from '../const';
import {FilmType, PromoFilmType, FilmCardType} from '../types/films';
import {loadFilms, loadPromoFilm, setError, requireAuthorization, setUserImage, addComment, loadComments, loadMyList, loadMoreLikeThis, loadFilm} from '../store/action';
import {AppDispatch, State} from '../store/types';
import {UserFormValues, AuthInfo, CommentType} from '../types/users';
import {removeToken, saveToken} from './token';

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

export const fetchFilmAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilm', async (id, { dispatch, extra: api }) => {
  await api
    .get<FilmCardType>(ApiRoute.Film(id))
    .then((res) => dispatch(loadFilm(res.data)))
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const fetchMoreLikeThis = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchMoreLikeThis', async (id, { dispatch, extra: api }) => {
  await api
    .get<FilmType[]>(ApiRoute.Similar(id))
    .then((res) => dispatch(loadMoreLikeThis(res.data)))
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const fetchComments = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('films/loadComments', async (id, { dispatch, extra: api }) => {
  await api
    .get<CommentType[]>(ApiRoute.Comments(id))
    .then((res) => dispatch(loadComments(res.data)))
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const sendComment = createAsyncThunk<
  void,
  { id: string; rating: number; comment: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'films/sendComment',
  async ({ id, rating, comment }, { dispatch, extra: api }) => {
    await api
      .post<CommentType>(ApiRoute.Comments(id), {
        rating: rating,
        comment: comment,
      })
      .then((res) => dispatch(addComment(res.data)))
      .catch((err: AxiosError) => {
        dispatch(setError(err.message));
      });
  }
);

export const fetchMyList = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('films/loadMyList', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<FilmType[]>(ApiRoute.Favorite())
    .then((res) => dispatch(loadMyList(res.data)))
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

      saveToken(data.token);
    })
    .catch((err: AxiosError) => {
      dispatch(setError(err.message));
    });
});

export const logOut = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout',async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout());
  removeToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<AuthInfo>(ApiRoute.Login())
    .then((res) => res.data)
    .then((data) => {
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserImage(data.avatarUrl));
    })
    .catch(() => {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    });
});
