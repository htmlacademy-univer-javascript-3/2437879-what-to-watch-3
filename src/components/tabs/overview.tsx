import {FilmCardType} from '../../types/films';
import {getFilmGrade} from '../../functions';

type OverviewProps = {
  filmCard: FilmCardType;
}

export default function Overview({filmCard}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">
          {filmCard.rating}
        </div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {getFilmGrade(filmCard.rating)}
          </span>
          <span className="film-rating__count">
            {filmCard.scoresCount} ratings
          </span>
        </p>
      </div>
      <div className="film-card__text">
        {filmCard.description}
        <p className="film-card__director">
          <strong>Director: {filmCard.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {`${filmCard.starring.join(', ')} `}
            and other
          </strong>
        </p>
      </div>
    </>
  );
}
