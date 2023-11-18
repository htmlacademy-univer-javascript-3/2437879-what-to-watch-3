import UserReview from './user-review';
import {useAppSelector} from '../hooks/hooks';
import {getComments} from '../../services/films/selectors';

export default function Reviews(): JSX.Element {
  const comments = useAppSelector(getComments);

  return (
    <div className="film-card__reviews-col">
      {comments.map((comment) => (
        <UserReview key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
