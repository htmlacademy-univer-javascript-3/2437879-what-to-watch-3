import {useState, FormEvent} from 'react';

type AddReviewFormProps = {
  onAnswer: (rating: number) => void;
};
export function AddReviewForm({ onAnswer }: AddReviewFormProps): JSX.Element {
  const [userAnswers, setUserAnswers] = useState(0);
  return (
    <form
      action="#"
      className="add-review__form"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        onAnswer(userAnswers);
      }}
    >
      <div className="rating">
        <div className="rating__stars">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
            <>
              <input
                className="rating__input"
                id={`star-${num}`}
                type="radio"
                name="rating"
                value={`${num}`}
                onChange={() => {
                  setUserAnswers(num);
                }}
              />
              <label className="rating__label" htmlFor={`star-${num}`}>
                Rating {num}
              </label>
            </>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
