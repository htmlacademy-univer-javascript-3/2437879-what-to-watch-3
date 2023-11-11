import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../hooks/hooks';
import {AppRoute} from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
