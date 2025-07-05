import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const ViewProductForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    productId: ""
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
          <h2 className="form-title">View Product</h2>
          <div className="form-group">
            <input
              type="text"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="form-label">Productid</label>
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
          {msg && <div className="form-msg">{msg}</div>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default ViewProductForm;
