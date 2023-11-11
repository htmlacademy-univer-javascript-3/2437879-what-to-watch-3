import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRoute} from '../const';
import {FilmType, PromoFilmType} from '../types/films';
import {loadFilms, loadPromoFilm} from '../store/action';
import {AppDispatch, State} from '../store/types';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  const films = await api.get<FilmType[]>(ApiRoute.Films()).then((res) => res.data);
  dispatch(loadFilms(films));
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
  const film = await api
    .get<PromoFilmType>(ApiRoute.Promo())
    .then((res) => res.data);
  dispatch(loadPromoFilm(film));
});
