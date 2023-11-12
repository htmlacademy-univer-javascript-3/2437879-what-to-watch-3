import UserReview from './user-review';
import {useAppSelector} from '../hooks/hooks';

export default function Reviews(): JSX.Element {
  const comments = useAppSelector((state) => state.comments);

  return (
    <div className="film-card__reviews-col">
      {comments.map((comment) => (
        <UserReview key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
