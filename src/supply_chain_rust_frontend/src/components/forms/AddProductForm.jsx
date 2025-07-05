import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";

const AddProductForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    origin: "",
    description: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await supplyChainActor.add_product(
        form.id,
        form.name,
        form.origin,
        form.certifications.split(",").map((c) => c.trim()),
        form.description ? [form.description] : []
      );
      setMsg("✅ Product added!");
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    }
  };

  return (
    <BackgroundWrapper>
      <form onSubmit={submitForm} className="form-container">
        <h4>Add Product</h4>
        <input name="id" placeholder="ID" className="form-control mb-2" onChange={handleChange} />
        <input name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
        <input name="origin" placeholder="Origin" className="form-control mb-2" onChange={handleChange} />
        <input name="certifications" placeholder="Certifications (comma-separated)" className="form-control mb-2" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="form-control mb-2" onChange={handleChange}></textarea>
        <button type="submit" className="btn btn-primary">Submit</button>
        {msg && <p className="mt-2">{msg}</p>}
      </form>
    </BackgroundWrapper>
  );
};

export default AddProductForm;

// 🔁 Do the same for:
// - TransferOwnershipForm.jsx
// - AddCertificationForm.jsx
// - ProductsByOwnerForm.jsx
// - VerifyOwnershipForm.jsx
// - ViewHistoryForm.jsx
// - ViewProductForm.jsx
// Just wrap with <BackgroundWrapper> and apply className="form-container"

// ✅ Done!