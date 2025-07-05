import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const TransferOwnershipForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    productId: "", newOwner: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // TODO: Call appropriate actor method here
      setMsg("✅ Success!");
    } catch (err) {
      setMsg("❌ Error: " + err.message);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Transfer Ownership</h2>
          <div className="form-group">
            <input
              type="text"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">Product Id</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="newOwner"
              value={form.newOwner}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">New Owner</label>
          </div>
          <button type="submit" className="form-button">Submit</button>
          {msg && <div className="form-msg">{msg}</div>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default TransferOwnershipForm;
