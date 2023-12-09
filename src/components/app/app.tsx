import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import PrivateRoute from '../private-route/private-route';
import {Routes, Route} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../hooks/hooks';
import {getIsDataLoading} from '../../services/films/selectors';
import Spinner from '../spinner/spinner';
import {useEffect} from 'react';
import {getAuthorized} from '../../services/user/selectors';
import {fetchMyList} from '../../services/api-actions';
import {HelmetProvider} from 'react-helmet-async';

function App(): JSX.Element {
  const isDataLoading = useAppSelector(getIsDataLoading);
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(getAuthorized);

  useEffect(() => {
    if (authorized) {
      dispatch(fetchMyList());
    }
  }, [authorized, dispatch]);

  if (isDataLoading) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyListPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Player} element={<PlayerPage />} />
        <Route path={AppRoute.Film} element={<MoviePage />} />
        <Route path={AppRoute.AddReview} element={
          <PrivateRoute>
            <AddReviewPage />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
