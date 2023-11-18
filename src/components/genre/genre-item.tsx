import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import {Genre} from '../../const';
import {setActiveGenre} from '../../services/films/films-slice';
import {getActiveGenre} from '../../services/films/selectors';

type GenreItemProps = {
  genre: Genre;
};

export default function GenreItem({genre}: GenreItemProps): JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const dispatch = useAppDispatch();

  const handleGenreClick = () => {
    dispatch(setActiveGenre(genre));
  };

  return (
    <li
      className={`catalog__genres-item ${
        genre === activeGenre ? 'catalog__genres-item--active' : ''
      }`}
      onClick={handleGenreClick}
    >
      <a className="catalog__genres-link" id={genre}>
        {genre}
      </a>
    </li>
  );
}
