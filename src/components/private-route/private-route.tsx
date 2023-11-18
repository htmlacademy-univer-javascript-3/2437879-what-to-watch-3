import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';
import {AppRoute} from '../../const';
import {getAuthorized} from '../../services/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorized = useAppSelector(getAuthorized);

  return authorized
    ? children
    : <Navigate to={AppRoute.SignIn} />;
}

export default PrivateRoute;
