import FilmCard from './film-card';
import {FilmType} from '../../types/films';
import {useState} from 'react';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import {hoverFilmCardTime} from '../../const';

type FilmCardsProps = {
  films: FilmType[];
  filmsCount: number;
};

export function FilmCards({films, filmsCount}: FilmCardsProps): JSX.Element {
  const [activeFilm, setSelectedFilm] = useState<string | null>(null);
  let timer: undefined | TimeoutId = undefined;

  const handleFilmFocus = (id: string) => {
    timer = setTimeout(() => {
      setSelectedFilm(id);
    }, hoverFilmCardTime);
  };

  const handleFilmOut = () => {
    clearTimeout(timer);
    setSelectedFilm(null);
  };

  return (
    <div className="catalog__films-list">
      {films.slice(0, filmsCount).map((film) => (
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
