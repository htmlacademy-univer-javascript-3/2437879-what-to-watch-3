import FilmCard from './film-card';
import {FilmCardType} from '../../types/films';
import {useState} from 'react';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

type FilmCardsProps = {
  films: FilmCardType[];
};

export function FilmCards({films}: FilmCardsProps): JSX.Element {
  const [activeFilm, setSelectedFilm] = useState<number | null>(null);
  let timer: undefined | TimeoutId = undefined;

  const handleFilmFocus = (id: number) => {
    timer = setTimeout(() => {
      setSelectedFilm(id);
    }, 1000);
  };

  const handleFilmOut = () => {
    clearTimeout(timer);
    setSelectedFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard
          key={film.id}
          promoFilm={film}
          activeFilm={activeFilm}
          onMouseOver={handleFilmFocus}
          onMouseOut={handleFilmOut}
        />
      ))}
    </div>
  );
}
