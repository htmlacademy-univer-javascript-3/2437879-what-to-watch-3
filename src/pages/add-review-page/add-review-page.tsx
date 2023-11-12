import {useEffect} from 'react';
import {AddReviewForm} from './add-review-form';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link, useNavigate, useParams} from 'react-router-dom';
import UserBlock from '../main-page/user-block';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {fetchFilmAction} from '../../services/api-actions';
import Spinner from '../../components/spinner/spinner';

function AddReviewPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filmCard = useAppSelector((state) => state.filmCard);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id]);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.SignIn);
  }

  if (!id) {
    navigate(AppRoute.NotFound);
  }

  if (!filmCard) {
    return <Spinner />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmCard.backgroundImage} alt={filmCard.name}/>
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
      <AddReviewForm />
    </section>
  );
}

export default AddReviewPage;
