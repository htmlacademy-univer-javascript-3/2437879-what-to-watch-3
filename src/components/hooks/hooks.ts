import {AppDispatch, State} from '../../store/types';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Genre} from '../../const';
import {getActiveGenre, getFilms} from '../../services/films/selectors';

export const useAppDispatch = () =>
  useDispatch<AppDispatch>();

export const useAppSelector:
  TypedUseSelectorHook<State> = useSelector;

export const useFilmsByGenre = () =>
  useAppSelector((state) => {
    const films = getFilms(state);
    const activeGenre = getActiveGenre(state);

    if (activeGenre === Genre.All) {
      return films;
    }

    return films.filter((film) =>
      film.genre === state.Films.activeGenre);
  });
