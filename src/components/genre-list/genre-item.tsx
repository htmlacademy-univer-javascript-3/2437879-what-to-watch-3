import {Genre} from '../../const';
import cn from 'classnames';

type GenreItemProps = {
  genre: Genre;
  isActiveGenre: boolean;
  onClick: (genre: Genre) => void;
};

export default function GenreItem({...props}: GenreItemProps): JSX.Element {
  return (
    <li
      className={cn('catalog__genres-item', props.isActiveGenre && 'catalog__genres-item--active')} onClick={() => props.onClick(props.genre)}
    >
      <a className="catalog__genres-link" id={props.genre}>
        {props.genre}
      </a>
    </li>
  );
}
