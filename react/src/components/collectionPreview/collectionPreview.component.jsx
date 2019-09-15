import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import http from '../../services/http';
import Card from '../card/card.component';
import Product from '../product/product.component';
import Loading from '../loading/loading.component';
import './collectionPreview.styles.scss';

const CollectionPreview = ({ history, department }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelRequest = null;
    const setCancel = cancel => (cancelRequest = cancel);

    http
      .get(`products?department=${department._id}`, setCancel)
      .then(({ data }) => setProducts(data))
      .catch(console.log);
    return () => {
      cancelRequest && cancelRequest();
    };
  }, [department]);

  return (
    <Card className="collection-preview">
      <h1
        className="collection-title no-select"
        onClick={() => {
          history.push(`department/${department._id}`);
        }}
      >
        {department.name}
      </h1>
      <div className="collection-hor-scroll">
        {products.length ? (
          products.map(product => (
            <Product className="collection-item" key={product._id} product={product} />
          ))
        ) : (
          <Loading className="collection-loading" />
        )}
      </div>
    </Card>
  );
};

export default withRouter(CollectionPreview);
