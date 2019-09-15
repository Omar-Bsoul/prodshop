import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from './../button/button.component';
import './product.styles.scss';

const Product = ({ history, className, product }) => {
  const { _id, name, price, imageUrl } = product;

  return (
    <div
      className={`product ${className}`}
      onClick={() => {
        history.push(`/product/${_id}`);
      }}
    >
      <div className="product-image-container">
        <div
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
          className="product-image"
        />
      </div>
      <Button className="add-to-cart">Add to Cart</Button>
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">{`$${price}`}</span>
      </div>
    </div>
  );
};

export default withRouter(Product);
