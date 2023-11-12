import {useState, ChangeEventHandler} from 'react';
import {useAppDispatch, useAppSelector} from '../../components/hooks/hooks';
import {sendComment} from '../../services/api-actions';
import Rating from './rating';

export function AddReviewForm(): JSX.Element {
  const filmCard = useAppSelector((state) => state.filmCard);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setComment(evt.target.value);
  };

  const handleSubmit = () => {
    if (filmCard?.id) {
      dispatch(sendComment({ comment, rating, id: filmCard.id }));
    }
  };

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
      >
        <Rating setRating={handleRatingChange} />

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={handleCommentChange}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" onClick={handleSubmit}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
