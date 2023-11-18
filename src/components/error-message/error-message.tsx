import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import '../../../markup/css/error-message.css';
import {hasError} from '../../services/films/selectors';
import {dropError} from '../../services/films/films-slice';

export default function ErrorMessage() {
  const error = useAppSelector(hasError);
  const dispatch = useAppDispatch();

  return error ? (
    <div className="error-message">
      Произошла ошибка. Повторите попытку позже
      <button className="close-button" onClick={() => dispatch(dropError())}>
        Close
      </button>
    </div>
  ) : null;
}
