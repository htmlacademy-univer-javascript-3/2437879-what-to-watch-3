import {ChangeEventHandler} from 'react';

type SetStarProps = {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function SetStar({ value, onChange }: SetStarProps) {
  return (
    <>
      <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={value} onChange={onChange} data-testid={'star'}/>
      <label className="rating__label" htmlFor={`star-${value}`}>
        Rating {value}
      </label>
    </>
  );
}
