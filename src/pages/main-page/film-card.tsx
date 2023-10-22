import {Films} from '../../types/films';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Films;
  onFilmCard: (id: number) => void;
};

function FilmCard({film, onFilmCard}: FilmCardProps): JSX.Element {
  const onMouseEnterHandler = () => {
    onFilmCard(film.id);
  };

  const onMouseLeaveHandler = () => {
    onFilmCard(0);
  };
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <img src={film.src}
          alt={film.title} width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film} className="small-film-card__link">{film.title}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
