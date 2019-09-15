import React from 'react';

import './formInput.styles.scss';

const FormInput = ({ className, handleChange, label, ...otherProps }) => {
  return (
    <div className={`form-input-container ${className}`}>
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label && (
        <label className={`form-input-label ${otherProps.value.length ? 'shrink' : ''}`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
