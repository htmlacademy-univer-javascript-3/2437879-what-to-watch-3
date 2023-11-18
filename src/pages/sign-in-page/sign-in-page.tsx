import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {ChangeEventHandler, FormEventHandler, useState} from 'react';
import {useAppDispatch} from '../../components/hooks/hooks';
import {login} from '../../services/api-actions';
import {useNavigate} from 'react-router-dom';
import {UserFormValues} from '../../types/users';
import Logo from '../../components/logo/logo';

function SignInPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormValues>({
    email: '',
    password: '',
  });

  const [, setIsValid] = useState(false);

  const handleValidate = (newFormData: UserFormValues) => {
    const validated =
      newFormData.email.match(/[a-zA-Z0-9.]+@[a-zA-Z]+[.][a-zA-Z]{2,4}$/) &&
      newFormData.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);
    setIsValid(!!validated);
  };

  const handleFieldChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    setFormData(() => {
      const newFormData: UserFormValues = { ...formData, [name]: value };
      handleValidate(newFormData);

      return newFormData;
    });
  };

  const handleSubmit: FormEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    dispatch(login(formData));
    navigate(AppRoute.Main);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" onChange={handleFieldChange} required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" onChange={handleFieldChange} required
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" onSubmit={handleSubmit}>Sign in</button>
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
