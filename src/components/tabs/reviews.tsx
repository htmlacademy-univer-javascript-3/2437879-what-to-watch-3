import UserReview from './user-review';
import {useAppSelector} from '../hooks/hooks';
import {getComments} from '../../services/films/selectors';

export default function Reviews(): JSX.Element {
  const comments = useAppSelector(getComments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.slice(0, comments.length / 2).map((comment) => (
          <UserReview key={comment.id} comment={comment} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments.slice(comments.length / 2, comments.length).map((comment) => (
          <UserReview key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
