
import React, { useState } from 'react';
import supplyChainActor from '../../utils/icp';

const AddProductForm = ({ onSubmit }) => {
  const [msg, setMsg] = useState('');

  const [form, setForm] = useState({
    id: '',
    name: '',
    origin: '',
    description: '',
    certifications: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    try {
      const result =  supplyChainActor.add_product(
        form.id,
        form.name,
        form.origin,
        form.certifications.split(",").map(c => c.trim()),
        form.description ? [form.description] : []
      );
      setMsg("✅ Product added!");
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    }
  };
    

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h4>Add Product</h4>
      <input name="id" placeholder="ID" className="form-control mb-2" onChange={handleChange} />
      <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
      <input name="origin" placeholder="Origin" className="form-control mb-2" onChange={handleChange} />
      <input name="description" placeholder="Description" className="form-control mb-2" onChange={handleChange} />
      <input name="certifications" placeholder="Cert1,Cert2" className="form-control mb-2" onChange={handleChange} />
      <button className="btn btn-primary">Add Product</button>
      <p className="mt-2">{msg}</p>
    </form>
  );
};

export default AddProductForm;
