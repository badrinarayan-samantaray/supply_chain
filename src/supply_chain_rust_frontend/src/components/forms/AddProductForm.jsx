import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss"; // Make sure this path is correct

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
      setMsg("Product Added");
      setForm({
        id: "",
        name: "",
        origin: "",
        description: "",
        certifications: "",
      });
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">Add Product</h2>

          {["id", "name", "origin", "description", "certifications"].map((field) => (
            <div key={field} className="form-group">
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required={field !== "description"}
                className="form-input"
              />
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
              </label>
            </div>
          ))}

          <button type="submit" className="form-button">
            Add Product
          </button>

          {msg && <div className="form-msg">{msg}</div>}
        </form>
      </div>
    </BackgroundWrapper>
  );
};

export default AddProductForm;
