import {PromoFilmType} from '../../types/films';
import {useAppSelector} from '../../components/hooks/hooks';
import {Link} from 'react-router-dom';
import UserBlock from './user-block';
import MyListButton from '../../components/my-list-button/my-list-button';
import {getAuthorized} from '../../services/user/selectors';
import Logo from '../../components/logo/logo';
import React from 'react';

type PromoFilmProps = {
  promoFilm: PromoFilmType;
}

// eslint-disable-next-line react-refresh/only-export-components
function PromoFilm({promoFilm}: PromoFilmProps): JSX.Element {
  const authorized = useAppSelector(getAuthorized);

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <Logo />

        <UserBlock />
      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.genre}</span>
              <span className="film-card__year">{promoFilm.released}</span>
            </p>

            <div className="film-card__buttons">
              <Link to={`player/${promoFilm.id}`} className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              {authorized && <MyListButton filmCard={promoFilm} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(PromoFilm);
