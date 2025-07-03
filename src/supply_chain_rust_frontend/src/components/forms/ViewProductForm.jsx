import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const ViewProductForm = ({ onSubmit }) => {
  const [id, setId] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(id);
  };

  return (
    <form className="p-4 bg-light border rounded shadow-sm" onSubmit={submitForm}>
      <h4>View Product</h4>
      <input
        className="form-control mb-3"
        placeholder="Enter Product ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <button className="btn btn-success">Fetch</button>
    </form>
  );
};

export default ViewProductForm;
