type ShowMoreButtonProps = {
  onClick: () => void;
};

export default function ShowMoreButton({onClick}: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>
        Show more
      </button>
    </div>
  );
}
