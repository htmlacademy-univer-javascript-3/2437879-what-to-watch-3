import {AppDispatch, State} from '../../store/types';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Genre} from '../../const';

export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector:
  TypedUseSelectorHook<State> = useSelector;

export const useFilmsByGenre = () =>
  useAppSelector((state) =>
    state.activeGenre === Genre.All
      ? state.films
      : state.films.filter((film) => film.genre === state.activeGenre)
  );
