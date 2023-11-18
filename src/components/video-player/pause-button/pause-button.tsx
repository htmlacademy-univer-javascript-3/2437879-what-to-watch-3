import React from 'react';

type PauseButtonProps = {
  onClick: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
function PauseButton({onClick}: PauseButtonProps) {
  return (
    <button type="button" className="player__play" onClick={onClick}>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </button>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(PauseButton);


