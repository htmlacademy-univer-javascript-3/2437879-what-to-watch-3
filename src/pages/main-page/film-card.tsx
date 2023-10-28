import {FilmCardType} from '../../types/films';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import VideoPlayer from '../../components/video-player/video-player';

type FilmCardProps = {
  promoFilm: FilmCardType;
  activeFilm: number | null;
  onMouseOver: (id: number) => void;
  onMouseOut: () => void;
};

function FilmCard({promoFilm, activeFilm, onMouseOver, onMouseOut}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image"
        onMouseOver={() => onMouseOver(promoFilm.id)}
        onMouseOut={() => onMouseOut()}
      >
        <VideoPlayer
          promoFilm={promoFilm}
          activeFilm={activeFilm}
          isMuted
        />
      </div>
      <h3 className="small-film-card__title">
        <Link to={AppRoute.Film} className="small-film-card__link">{promoFilm.title}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
