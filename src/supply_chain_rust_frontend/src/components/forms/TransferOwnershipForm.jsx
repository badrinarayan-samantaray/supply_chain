import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const TransferOwnershipForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ productId: "", newOwner: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await supplyChainActor.transfer_ownership(form.productId, form.newOwner);
      setMsg("Ownership transferred!");
      setForm({ productId: "", newOwner: "" });
    } catch (err) {
      setMsg("Error: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Transfer Ownership</h2>
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
              name="newOwner"
              value={form.newOwner}
              onChange={handleChange}
              placeholder="New Owner Principal"
              required
            />
          </div>
          <button type="submit" className="form-button">Transfer</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default TransferOwnershipForm;
