import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const VerifyOwnershipForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ id: '', owner: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="p-4 bg-light border rounded shadow-sm" onSubmit={submitForm}>
      <h4>Verify Ownership</h4>
      <div className="mb-3">
        <label>Product ID</label>
        <input className="form-control" name="id" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Owner</label>
        <input className="form-control" name="owner" onChange={handleChange} required />
      </div>
      <button className="btn btn-secondary">Verify</button>
    </form>
  );
};

export default VerifyOwnershipForm;
