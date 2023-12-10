import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import GenreItem from './genre-item';
import {getGenres, getActiveGenre} from '../../services/films/selectors';
import {setActiveGenre} from '../../services/films/films-slice';
import {Genre} from '../../const';

export default function GenreList() {
  const genres = useAppSelector(getGenres);
  const activeGenre = useAppSelector(getActiveGenre);
  const dispatch = useAppDispatch();

  const handleGenreClick = (genre: Genre) => {
    dispatch(setActiveGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres)
        .slice(0, 9)
        .map((genre) => (
          <GenreItem
            genre={genre}
            isActiveGenre={genre === activeGenre}
            onClick={handleGenreClick}
            key={genre}
          />
        ))}
    </ul>
  );
}
