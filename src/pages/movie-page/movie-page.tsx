import {FilmCards} from '../main-page/film-cards';
import {AppRoute, AuthorizationStatus, MoreLikeFilmsCount} from '../../const';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import UserBlock from '../main-page/user-block';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import Spinner from '../../components/spinner/spinner';
import {useEffect} from 'react';
import {fetchComments, fetchFilmAction, fetchMoreLikeThis} from '../../services/api-actions';

function MoviePage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const error = useAppSelector((state) => state.error);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const filmCard = useAppSelector((state) => state.filmCard);
  const moreLikeThis = useAppSelector((state) => state.moreLikeThis);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchMoreLikeThis(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  if (error || !id) {
    navigate(AppRoute.NotFound);
  }

  if (!filmCard || filmCard.id !== id) {
    return <Spinner />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmCard.backgroundImage} alt={filmCard.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.Main} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
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
