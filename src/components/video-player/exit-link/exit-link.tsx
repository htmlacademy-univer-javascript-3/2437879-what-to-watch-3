import React from 'react';
import {Link} from 'react-router-dom';

function ExitLink(): JSX.Element {
  return (
    <Link
      to="/"
      style={{ textDecoration: 'none' }}
      type="button"
      className="player__exit"
    >
      Exit
    </Link>
  );
}

export default React.memo(ExitLink);

