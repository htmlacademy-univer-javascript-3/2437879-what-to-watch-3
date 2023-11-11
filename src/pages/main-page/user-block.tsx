import {useAppSelector} from '../../components/hooks/hooks';
import {AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const userImage = useAppSelector((state) => state.userImage);

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={userImage} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link">Sign out</a>
      </li>
    </ul>
  );
}
