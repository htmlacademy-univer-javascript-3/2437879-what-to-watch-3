import {FilmCards} from './film-cards';
import GenreList from '../../components/genre/genre-list';
import {useAppSelector} from '../../components/hooks/hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import Spinner from '../../components/spinner/spinner';
import PromoFilm from './promo-film';

function MainPage(): JSX.Element {
  const films = useAppSelector((state) => state.filmsByGenre);
  const promoFilm = useAppSelector((state) => state.promoFilm);
  const filmsCount = useAppSelector((state) => state.filmsCount);

  return (
    <>
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
            {filmsCount < films.length && <ShowMoreButton />}
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
