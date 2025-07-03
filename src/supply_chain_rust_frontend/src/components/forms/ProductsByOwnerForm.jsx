import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const ProductsByOwnerForm = ({ onSubmit }) => {
  const [owner, setOwner] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(owner);
  };

  return (
    <form className="p-4 bg-light border rounded shadow-sm" onSubmit={submitForm}>
      <h4>Get Products by Owner</h4>
      <input
        className="form-control mb-3"
        placeholder="Enter Owner Principal"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        required
      />
      <button className="btn btn-primary">Fetch</button>
    </form>
  );
};

export default ProductsByOwnerForm;
