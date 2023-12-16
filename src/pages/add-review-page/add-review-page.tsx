import {useEffect} from 'react';
import {AddReviewForm} from './add-review-form';
import {Link, useParams} from 'react-router-dom';
import UserBlock from '../../components/user-block/user-block';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {fetchFilmDataAction} from '../../services/api-actions';
import {getFilmCard} from '../../services/films-slice/selectors';
import Logo from '../../components/logo/logo';
import {Helmet} from 'react-helmet-async';

export default function AddReviewPage() {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const filmCard = useAppSelector(getFilmCard);

  useEffect(() => {
    if (id && id !== filmCard?.id) {
      dispatch(fetchFilmDataAction(id));
    }
  }, [dispatch, filmCard?.id, id]);

  if (!filmCard) {
    return null;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>{filmCard.name} | Новый отзыв</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmCard.backgroundImage} alt={filmCard.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/film/${filmCard.id}`} className="breadcrumbs__link">{filmCard.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmCard.posterImage} alt={`${filmCard.name} poster`} width="218"
            height="327"
          />
        </div>
      </div>
      <AddReviewForm id={filmCard.id} />
    </section>
  );
}
