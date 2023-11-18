import {useAppDispatch} from '../../components/hooks/hooks';
import {fetchFilmsAction} from '../../services/api-actions';


function NotFoundPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleTryAgain = () => {
    dispatch(fetchFilmsAction());
  };

  return (
    <section className="user-page">
      <p className="error__text">
        Произошла ошибка. Пожалуйста, попробуйте ещё раз
      </p>
      <button
        onClick={handleTryAgain}
        className="replay replay--error"
        type="button"
      >
        Попробовать снова
      </button>
    </section>
  );
}

export default NotFoundPage;
