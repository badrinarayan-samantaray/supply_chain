// src/components/forms/TransferOwnershipForm.jsx
import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const TransferOwnershipForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ id: '', new_owner: '', metadata: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="p-4 bg-light border rounded shadow-sm" onSubmit={submitForm}>
      <h4>Transfer Ownership</h4>
      <div className="mb-3">
        <label>Product ID</label>
        <input className="form-control" name="id" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>New Owner</label>
        <input className="form-control" name="new_owner" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Metadata (optional)</label>
        <input className="form-control" name="metadata" onChange={handleChange} />
      </div>
      <button className="btn btn-warning">Transfer</button>
    </form>
  );
};

export default TransferOwnershipForm;
