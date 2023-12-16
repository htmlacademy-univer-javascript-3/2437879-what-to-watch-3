import {useState, ChangeEventHandler} from 'react';
import {useAppDispatch} from '../../components/hooks/hooks';
import {sendCommentAction} from '../../services/api-actions';
import Rating from './rating';
import {useNavigate} from 'react-router-dom';
import {CommentLength} from '../../const';

export type AddReviewFormProps = {
  id: string;
};

export function AddReviewForm({id}: AddReviewFormProps): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () =>
    rating !== 0 &&
    comment.length >= CommentLength.Min && comment.length <= CommentLength.Max;

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (evt,) => {
    setComment(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch(sendCommentAction({ comment, rating, id }));
    navigate(`/films/${id}`);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <Rating setRating={handleRatingChange} />

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleCommentChange} data-testid={'comment'}>
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" onClick={handleSubmit} disabled={!validate()}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
