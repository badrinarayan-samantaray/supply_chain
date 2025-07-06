import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const VerifyOwnershipForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ productId: "", owner: "" });
  const [verified, setVerified] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const isOwner = await supplyChainActor.verify_ownership(
        form.productId,
        form.owner
      );
      setVerified(isOwner);
      setMsg("✅ Verification complete.");
    } catch (err) {
      setMsg("❌ Error: " + (err.message || JSON.stringify(err)));
      setVerified(null);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Verify Ownership</h2>
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
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="Owner Principal"
              required
            />
          </div>
          <button type="submit" className="form-button">Verify</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>

        {verified !== null && (
          <div className="result-box">
            {verified ? (
              <p>✅ Yes, this user owns the product.</p>
            ) : (
              <p>❌ No, this user does not own the product.</p>
            )}
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default VerifyOwnershipForm;
