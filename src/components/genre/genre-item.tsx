import {useAppSelector} from '../hooks/hooks';
import {Genre} from '../../const';

type GenreItemProps = {
  genre: Genre;
  onClick: (genre: Genre) => void;
};

export default function GenreItem({genre, onClick}: GenreItemProps): JSX.Element {
  const activeGenre = useAppSelector((state) => state.activeGenre);

  return (
    <li
      className={`catalog__genres-item ${
        genre === activeGenre ? 'catalog__genres-item--active' : ''
      }`}
      onClick={() => onClick(genre)}
    >
      <a className="catalog__genres-link" id={genre}>
        {genre}
      </a>
    </li>
  );
}
