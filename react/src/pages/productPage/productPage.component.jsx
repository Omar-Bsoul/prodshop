import React, { useState, useEffect } from 'react';

import http from '../../services/http';
import Button from '../../components/button/button.component';
import './productPage.styles.scss';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    let cancelRequest = null;
    const setCencel = cancel => (cancelRequest = cancel);

    http
      .get(`products/${match.params.id}`, setCencel)
      .then(({ data }) => setProduct(data))
      .catch(console.log);
    return () => {
      cancelRequest && cancelRequest();
    };
  }, [match.params.id]);

  return (
    <div className="product-page">
      <div className="card background-image-container">
        <div className="product-details">
          <span className="product-title">{product.name}</span>
          <span className="product-price">${product.price}</span>
        </div>
        <Button className="product-to-cart">Add to Cart</Button>
        <div
          style={{
            backgroundImage: `url(${product.imageUrl})`
          }}
          className="product-image"
        />
      </div>
      <span className="product-date">
        Posted At: {new Date(product.createdAt).toLocaleDateString()}
      </span>
      <span className="product-description">
        Description: {<br />}
        {product.description}
      </span>
    </div>
  );
};

export default ProductPage;
