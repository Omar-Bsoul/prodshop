import React from 'react';

import './loading.styles.scss';

const Loading = ({ className, varient }) => {
  const loadingVarient = varient || 'ellipsis';

  switch (loadingVarient) {
    case 'circle':
      return (
        <div className={`lds-circle ${className}`}>
          <div></div>
        </div>
      );

    case 'dual-ring':
      return <div className={`lds-dual-ring ${className}`}></div>;

    case 'facebook':
      return (
        <div className={`lds-facebook ${className}`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'heart':
      return (
        <div className={`lds-heart ${className}`}>
          <div></div>
        </div>
      );

    case 'ring':
      return (
        <div className={`lds-ring ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'roller':
      return (
        <div className={`lds-roller ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'default':
      return (
        <div className={`lds-default ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'ellipsis':
      return (
        <div className={`lds-ellipsis ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'grid':
      return (
        <div className={`lds-grid ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    case 'hourglass':
      return <div className={`lds-hourglass ${className}`}></div>;

    case 'ripple':
      return (
        <div className={`lds-ripple ${className}`}>
          <div></div>
          <div></div>
        </div>
      );

    case 'spinner':
      return (
        <div className={`lds-spinner ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );

    default:
      return <h1 className={className}>Loading varient {varient || 'none'} not defined!</h1>;
  }
};

export default Loading;
