import React, { useState, useEffect } from 'react';

import http from '../../services/http';
import ProductList from '../../components/productList/productList.component';
import './departmentPage.styles.scss';

const DepartmentPage = ({ match }) => {
  const [department, setDepartment] = useState({ imageUrl: '' });

  useEffect(() => {
    let cancelRequest = null;
    const setCancel = cancel => (cancelRequest = cancel);

    http
      .get(`departments/${match.params.id}`, setCancel)
      .then(response => setDepartment(response.data))
      .catch(console.log);
    return () => {
      cancelRequest && cancelRequest();
    };
  }, [match.params.id]);

  return (
    <div className="department-page">
      <div className="card background-image-container">
        <div
          style={{
            backgroundImage: `url(${department.imageUrl})`
          }}
          className="department-image"
        />
      </div>
      <span className="department-title">{department.name}</span>
      <span className="department-description">{department.description}</span>
      <ProductList className="department-products" department={department._id} />
    </div>
  );
};

export default DepartmentPage;
