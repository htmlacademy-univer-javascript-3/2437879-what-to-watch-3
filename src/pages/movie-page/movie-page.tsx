import {FilmCards} from '../main-page/film-cards';
import {AppRoute, MoreLikeFilmsCount} from '../../const';
import {Link, useParams} from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../main-page/user-block';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {useEffect} from 'react';
import {fetchFilmAction} from '../../services/api-actions';
import {getAuthorized} from '../../services/user/selectors';
import {getFilmCard, getMoreLikeThis} from '../../services/films/selectors';
import Logo from '../../components/logo/logo';
import MyListButton from '../../components/my-list-button/my-list-button';
import {Helmet} from 'react-helmet-async';

function MoviePage() {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const authorized = useAppSelector(getAuthorized);
  const filmCard = useAppSelector(getFilmCard);
  const moreLikeThis = useAppSelector(getMoreLikeThis);

  useEffect(() => {
    if (id && id !== filmCard?.id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, filmCard?.id, id]);

  if (!filmCard) {
    return null;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <Helmet>
          <title>{filmCard.name}</title>
        </Helmet>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmCard.backgroundImage} alt={filmCard.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmCard.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmCard.genre}</span>
                <span className="film-card__year">{filmCard.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${filmCard.id}`} className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorized && (
                  <>
                    <MyListButton filmCard={filmCard} />
                    <Link to={'review'} className="btn film-card__button">
                      Add review
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmCard.posterImage} alt={`${filmCard.name} poster`} width="218"
                height="327"
              />
            </div>
            <Tabs filmCard={filmCard}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        {moreLikeThis.length !== 0 && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <FilmCards films={moreLikeThis} filmsCount={MoreLikeFilmsCount}/>
          </section>
        )}

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
    </>
  );
}

export default MoviePage;
