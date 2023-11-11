import {useState} from 'react';
import {FilmCardType} from '../../types/films';
import {AddReviewForm} from './add-review-form';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

type AddReviewPageProps = {
  promoFilms: FilmCardType;
};

function AddReviewPage({promoFilms}: AddReviewPageProps): JSX.Element {
  const [, setFilmRating] = useState(0);
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={promoFilms.backgroundImage} alt={promoFilms.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Main} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film} className="breadcrumbs__link">{promoFilms.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={promoFilms.posterImage} alt={`${promoFilms.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm onAnswer={(rating) => setFilmRating(rating)} />
      </div>
    </section>
  );
}

export default AddReviewPage;
