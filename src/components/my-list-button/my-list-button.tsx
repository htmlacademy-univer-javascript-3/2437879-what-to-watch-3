import {FilmCardType, PromoFilmType} from '../../types/films';
import {setFilmStatus} from '../../services/api-actions';
import {FilmStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {getMyList} from '../../services/films/selectors';

type MyListButtonProps = {
  filmCard: FilmCardType | PromoFilmType;
};

export default function MyListButton({filmCard}: MyListButtonProps) {
  const dispatch = useAppDispatch();
  const myFilms = useAppSelector(getMyList);

  const handleAddButtonClick = () => {
    dispatch(
      setFilmStatus({
        id: filmCard.id,
        filmStatus: filmCard.isFavorite ? FilmStatus.Viewed : FilmStatus.ToView,
      })
    );
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleAddButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={filmCard.isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{myFilms.length}</span>
    </button>
  );
}
