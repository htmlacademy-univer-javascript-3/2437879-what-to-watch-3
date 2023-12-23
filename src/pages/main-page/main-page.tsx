import {FilmCards} from '../../components/film-cards/film-cards';
import GenreList from '../../components/genre-list/genre-list';
import {useAppSelector} from '../../components/hooks/hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import PromoFilm from '../../components/promo-film/promo-film';
import {useState} from 'react';
import {SHOW_FILMS_COUNT} from '../../const';
import {useFilmsByGenre} from '../../components/hooks/hooks';
import {getPromoFilm} from '../../services/films-slice/selectors';
import {Helmet} from 'react-helmet-async';

function MainPage(): JSX.Element {
  const [filmsCount, setFilmsCount] = useState(SHOW_FILMS_COUNT);
  const films = useFilmsByGenre();
  const promoFilm = useAppSelector(getPromoFilm);

  const handleShowMoreButtonClick = () =>
    setFilmsCount((prevState) => prevState + SHOW_FILMS_COUNT);

  return (
    <>
      <Helmet>
        <title>Главная</title>
      </Helmet>
      {promoFilm && <PromoFilm promoFilm={promoFilm} />}

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {films.length !== 0 ? (
            <>
              <GenreList />
              <FilmCards films={films} filmsCount={filmsCount} />
            </>
          ) : (
            <Spinner />
          )}

          <div className="catalog__more">
            {filmsCount < films.length && <ShowMoreButton onClick={handleShowMoreButtonClick} />}
          </div>

        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
