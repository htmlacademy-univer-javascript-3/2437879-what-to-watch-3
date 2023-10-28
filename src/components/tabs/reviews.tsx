import UserReview from './user-review';
import {ReviewType} from '../../types/films';

type ReviewsProps = {
  reviews: ReviewType[];
};

export default function Reviews({reviews}: ReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => (
        <UserReview key={review.id} review={review} />
      ))}
    </div>
  );
}
