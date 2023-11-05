import MainPage from '../../pages/main-page/main-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {PromoFilmType, FilmCardType} from '../../types/films';
import {mainFilm} from '../../mocks/films';

type AppProps = {
  promoFilm: PromoFilmType;
  films: FilmCardType[];
}

function App({promoFilm, films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage promoFilm={promoFilm} />} />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.NoAuth}
          >
            <MyListPage films={films}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Film}>
          <Route index element={<MoviePage promoFilm={mainFilm} films={films}/>} />
          <Route path={AppRoute.AddReview} element={<AddReviewPage promoFilms={mainFilm}/>} />
        </Route>
        <Route path={AppRoute.Player} element={<PlayerPage videoUrl={mainFilm.video}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
