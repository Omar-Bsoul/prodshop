import React, { useState, useEffect } from 'react';

import http from '../../services/http';
import CollectionPreview from '../../components/collectionPreview/collectionPreview.component';
import Loading from '../../components/loading/loading.component';
import './shopPage.styles.scss';

const ShopPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    let cancelRequest = null;
    const setCancel = cancel => (cancelRequest = cancel);

    http
      .get('departments', setCancel)
      .then(({ data }) => setDepartments(data))
      .catch(console.log);
    return () => {
      cancelRequest && cancelRequest();
    };
  }, []);

  if (departments.length) {
    return departments.map(department => (
      <CollectionPreview key={department._id} department={department} />
    ));
  } else {
    return <Loading className="center" />;
  }
};

export default ShopPage;
