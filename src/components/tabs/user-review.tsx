import {getFormattedDate} from '../../functions';
import {CommentType} from '../../types/users';

type UserReviewProps = {
  comment: CommentType;
};

export default function UserReview({comment}: UserReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{comment.user}</cite>
          <time className="review__date" dateTime={comment.date}>
            {getFormattedDate(comment.date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}
