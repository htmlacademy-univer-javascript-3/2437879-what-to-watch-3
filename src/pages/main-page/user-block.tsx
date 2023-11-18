import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {logOut} from '../../services/api-actions';
import {getAuthorized, getUserImage} from '../../services/user/selectors';

export default function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(getAuthorized);
  const userImage = useAppSelector(getUserImage);
  const handleSignOutClick = () => {
    dispatch(logOut());
  };

  if (!authorized) {
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
          <Link to={AppRoute.MyList}>
            <img src={userImage} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={handleSignOutClick}>Sign out</a>
      </li>
    </ul>
  );
}
