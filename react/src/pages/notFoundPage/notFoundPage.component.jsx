import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';

import './notFoundPage.styles.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found no-select">
      <span>
        <FontAwesomeIcon icon={faFrownOpen} /> {''}
        Page Not Found
      </span>
      <br />
      <span>404</span>
    </div>
  );
};

export default NotFoundPage;
