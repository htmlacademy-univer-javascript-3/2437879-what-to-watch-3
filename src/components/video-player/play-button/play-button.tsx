import React from 'react';

type PlayButtonProps = {
  onClick: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
function PlayButton({ onClick }: PlayButtonProps) {
  return (
    <button type="button" className="player__play" onClick={onClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(PlayButton);
