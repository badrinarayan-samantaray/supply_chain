import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const ViewProductForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ productId: "" });
  const [productData, setProductData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await supplyChainActor.get_product(form.productId);
      console.log("Raw result:", result); // Debug response

      // Try Rust-style: { Ok: { ... } }
      if (result?.Ok) {
        setProductData(result.Ok);
        setMsg("✅ Product found!");
      } 
      // Or Motoko-style direct object
      else if (result && typeof result === "object" && result.id) {
        setProductData(result);
        setMsg("✅ Product found!");
      } 
      else {
        setProductData(null);
        setMsg("❌ Product not found.");
      }
    } catch (err) {
      setMsg("❌ Error: " + (err.message || JSON.stringify(err)));
      setProductData(null);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">View Product</h2>
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
          <button type="submit" className="form-button">View Product</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>

        {productData && (
          <div className="result-box">
            <h3>Product Details:</h3>
            <p><strong>ID:</strong> {productData.id}</p>
            <p><strong>Name:</strong> {productData.name}</p>
            <p><strong>Origin:</strong> {productData.origin}</p>
            <p><strong>Certifications:</strong> {productData.certifications?.join(", ") || "None"}</p>
            <p><strong>Description:</strong> {productData.description?.[0] || "N/A"}</p>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default ViewProductForm;
