import {FilmCards} from '../main-page/film-cards';
import {AppRoute, ShowFilmsCount} from '../../const';
import {Link} from 'react-router-dom';
import UserBlock from '../main-page/user-block';
import {useEffect} from 'react';
import {fetchMyList} from '../../services/api-actions';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';

function MyListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.myList);

  useEffect(() => {
    dispatch(fetchMyList());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCards films={films} filmsCount={ShowFilmsCount}/>
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
