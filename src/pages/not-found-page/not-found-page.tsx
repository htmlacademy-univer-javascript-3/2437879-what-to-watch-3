import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <section className="user-page">
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundPage;
