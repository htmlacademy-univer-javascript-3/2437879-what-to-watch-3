import {useAppSelector} from '../hooks/hooks';
import GenreItem from './genre-item';
import {getGenres} from '../../services/films/selectors';

export default function GenreList() {
  const genres = useAppSelector(getGenres);

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres)
        .slice(0, 9)
        .map((genre) => (
          <GenreItem genre={genre} key={genre} />
        ))}
    </ul>
  );
}
