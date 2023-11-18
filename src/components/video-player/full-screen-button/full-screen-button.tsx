import React from 'react';

type FullScreenButtonProps = {
  onClick: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
function FullScreenButton({onClick}: FullScreenButtonProps) {
  return (
    <button type="button" className="player__full-screen" onClick={onClick}>
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"></use>
      </svg>
      <span>Full screen</span>
    </button>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(FullScreenButton);

