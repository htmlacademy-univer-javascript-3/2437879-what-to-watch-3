import FilmCard from './film-card';
import {Films} from '../../types/films';
import {useState} from 'react';

type FilmCardsProps = {
  filmId: number;
  films: Films[];
};

export function FilmCards({filmId, films}: FilmCardsProps): JSX.Element {
  const [, setSelectedFilm] = useState(0);
  return (
    <div className="catalog__films-list">
      {films.map((film) => {
        if (film.id !== filmId) {
          return (
            <FilmCard
              key={film.id}
              film={film}
              onFilmCard={(id) => {
                setSelectedFilm(id);
              }}
            />
          );
        }
      })}
    </div>
  );
}
