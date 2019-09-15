import React from 'react';

import './department.styles.scss';

const Department = ({ className, name, imageUrl }) => {
  return (
    <div className={`department ${className}`}>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
        className="department-image"
      />
      <div className="department-content">
        <h1 className="department-title">{name}</h1>
        <span className="department-subtitle">Shop Now</span>
      </div>
    </div>
  );
};

export default Department;
