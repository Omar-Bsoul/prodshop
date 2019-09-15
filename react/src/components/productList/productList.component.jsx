import React, { useState, useEffect } from 'react';

import http from '../../services/http';
import Product from '../product/product.component';
import Loading from '../loading/loading.component';
import './productList.styles.scss';

const ProductList = ({ className, department }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelRequest = null;
    const setCancel = cancel => (cancelRequest = cancel);

    http
      .get(`products?department=${department}`, setCancel)
      .then(({ data }) => setProducts(data))
      .catch(console.log)
      .finally(() => setLoaded(true));
    return () => {
      cancelRequest && cancelRequest();
    };
  }, [department]);

  return (
    <div className={`product-list-container ${className}`}>
      {loaded ? (
        <ul className="product-list">
          {products.map(product => (
            <li key={product._id}>
              <Product product={product} className="card" />
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductList;
