import {AppRoute} from '../../const';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate(AppRoute.Main);
  };

  return (
    <section className="user-page">
      <Helmet>
        <title>404</title>
      </Helmet>
      <p className="error__text">
        404. Page not found
      </p>
      <button
        onClick={handleTryAgain}
        className="replay replay--error"
        type="button"
      >
        Back to main page.
      </button>
    </section>
  );
}

export default NotFoundPage;
