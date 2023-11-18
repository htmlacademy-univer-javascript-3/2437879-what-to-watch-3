import React from 'react';
import {Link} from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ExitLink);

