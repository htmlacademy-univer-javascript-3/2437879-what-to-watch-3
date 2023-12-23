import {AppRoute, AuthorizationStatus} from '../../const';
import {Link, useNavigate} from 'react-router-dom';
import {FormEventHandler, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {loginAction} from '../../services/api-actions';
import {getAuthorizationStatus} from '../../services/user-slice/selectors';
import Logo from '../../components/logo/logo';
import {Helmet} from 'react-helmet-async';
import {toast} from 'react-toastify';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const validateEmail = (login: string) =>
    Boolean(login.match(/[a-zA-Z0-9.]+@[a-zA-Z]+[.][a-zA-Z]{2,4}$/));

  const validatePassword = (password: string) =>
    Boolean(password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/));

  const handleSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (!validateEmail(loginRef.current.value)) {
        toast.warn('Введите корректный email');
        return;
      }

      if (!validatePassword(passwordRef.current.value)) {
        toast.warn('Введите пароль, состоящий минимум из одной латинской буквы и цифры');
        return;
      }

      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }

    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    } else {
      toast.warn('Неправильный логин и/или пароль');
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>Вход</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" data-testid={'user-slice-email'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" data-testid={'user-slice-password'}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;
