import AddToMyListButton from './add-to-my-list-button';
import RemoveToMyListButton from './remove-from-my-list-button';
import {FilmCardType, PromoFilmType} from '../../types/films';

type MyListButtonProps = {
  filmCard: FilmCardType | PromoFilmType;
};

export default function MyListButton({filmCard}: MyListButtonProps) {
  return filmCard.isFavorite ? (
    <RemoveToMyListButton filmId={filmCard.id} />
  ) : (
    <AddToMyListButton filmId={filmCard.id} />
  );
}
