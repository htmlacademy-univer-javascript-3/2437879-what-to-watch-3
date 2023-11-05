import {addShowedFilms} from '../../store/action';
import {useAppDispatch} from '../hooks/hooks';

export default function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleShowMoreClick = () => {
    dispatch(addShowedFilms());
  };

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
}
