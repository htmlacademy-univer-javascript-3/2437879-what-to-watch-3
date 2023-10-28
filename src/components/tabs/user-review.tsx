import {ReviewType} from '../../types/films';
import {getFormattedDate} from '../../functions';

type UserReviewProps = {
  review: ReviewType;
};

export default function UserReview({review}: UserReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.date}>
            {getFormattedDate(review.date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}
