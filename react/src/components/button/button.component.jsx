import React from 'react';

import './button.styles.scss';

const Button = ({ className, onClick, children, otherProps }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
