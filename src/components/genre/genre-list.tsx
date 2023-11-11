import {Genre} from '../../const';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {useEffect} from 'react';
import {setActiveGenre, setGenres} from '../../store/action';
import GenreItem from './genre-item';

export default function GenreList() {
  const films = useAppSelector((state) => state.films);
  const genres = useAppSelector((state) => state.genres);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newGenres = new Set<Genre>([Genre.All]);
    films.forEach((film) => newGenres.add(film.genre));

    dispatch(setGenres(Array.from(newGenres).slice(0, 9)));
  }, [dispatch, films]);

  const handleGenreClick = (genre: Genre) => {
    dispatch(setActiveGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres)
        .slice(0, 9)
        .map((genre) => (
          <GenreItem genre={genre} onClick={handleGenreClick} key={genre} />
        ))}
    </ul>
  );
}
