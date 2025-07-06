import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const AddCertificationForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    productId: "",
    certification: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await supplyChainActor.add_certification(form.productId, form.certification);
      setMsg("Certification Added Successfully");
      setForm({ productId: "", certification: "" });
    } catch (err) {
      setMsg("Error: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Add Certification</h2>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              placeholder="Product ID"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              name="certification"
              value={form.certification}
              onChange={handleChange}
              placeholder="Certification (e.g. ISO9001)"
              required
            />
          </div>
          <button type="submit" className="form-button">Add Certification</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default AddCertificationForm;
