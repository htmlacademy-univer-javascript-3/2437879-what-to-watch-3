type FilmCardProps = {
  imgSrc: string;
  imgDescription: string;
}

function FilmCard({imgSrc, imgDescription}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imgSrc}
          alt={imgDescription} width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{imgDescription}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
