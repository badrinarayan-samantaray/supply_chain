// src/components/forms/AddCertificationForm.jsx
import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const AddCertificationForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ id: '', certification: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="p-4 bg-light border rounded shadow-sm" onSubmit={submitForm}>
      <h4>Add Certification</h4>
      <div className="mb-3">
        <label>Product ID</label>
        <input className="form-control" name="id" onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Certification</label>
        <input className="form-control" name="certification" onChange={handleChange} required />
      </div>
      <button className="btn btn-info text-white">Add</button>
    </form>
  );
};

export default AddCertificationForm;
