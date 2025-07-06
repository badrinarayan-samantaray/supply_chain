import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const ProductsByOwnerForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ owner: "" });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await supplyChainActor.get_products_by_owner(form.owner);
      setProducts(result);
      setMsg("✅ Products fetched!");
    } catch (err) {
      setMsg("❌ Error: " + (err.message || JSON.stringify(err)));
      setProducts([]);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Products By Owner</h2>
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
          <button type="submit" className="form-button">View Products</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>

        {products.length > 0 && (
          <div className="result-box">
            <h3>Owned Products:</h3>
            <ul>
              {products.map((id, idx) => (
                <li key={idx}>{id}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default ProductsByOwnerForm;
