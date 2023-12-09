import {FilmCards} from '../main-page/film-cards';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import UserBlock from '../main-page/user-block';
import {useAppSelector} from '../../components/hooks/hooks';
import {getMyList} from '../../services/films/selectors';
import Logo from '../../components/logo/logo';
import {Helmet} from 'react-helmet-async';

function MyListPage(): JSX.Element {
  const films = useAppSelector(getMyList);

  return (
    <div className="user-page">
      <Helmet>
        <title>Мои фильмы</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCards films={films} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListPage;
