import React, { useState } from "react";
import supplyChainActor from "../../utils/icp";
import BackgroundWrapper from "../BackgroundWrapper";
import "../../form.scss";

const ViewHistoryForm = () => {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ productId: "" });
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await supplyChainActor.get_history(form.productId);
      setHistory(result);
      setMsg("History Fetched");
    } catch (err) {
      setMsg("Error: " + (err.message || JSON.stringify(err)));
      setHistory([]);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="form-wrapper">
        <form onSubmit={submitForm} className="form-container">
          <h2 className="form-title">View History</h2>
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
          <button type="submit" className="form-button">View History</button>
          {msg && <p className="form-message">{msg}</p>}
        </form>

        {history.length > 0 && (
          <div className="result-box">
            <h3>Ownership History:</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
};

export default ViewHistoryForm;
