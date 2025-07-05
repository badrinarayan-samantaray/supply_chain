import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./LandingPage";

import AddProduct from "./components/forms/AddProductForm";
import TransferOwnership from "./components/forms/TransferOwnershipForm";
import AddCertification from "./components/forms/AddCertificationForm";
import ProductsByOwner from "./components/forms/ProductsByOwnerForm";
import VerifyOwnership from "./components/forms/VerifyOwnershipForm";
import ViewHistory from "./components/forms/ViewHistoryForm";
import ViewProduct from "./components/forms/ViewProductForm";


import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/transfer-ownership" element={<TransferOwnership />} />
      <Route path="/add-certification" element={<AddCertification />} />
      <Route path="/products-by-owner" element={<ProductsByOwner />} />
      <Route path="/verify-ownership" element={<VerifyOwnership />} />
      <Route path="/view-history" element={<ViewHistory />} />
      <Route path="/view-product" element={<ViewProduct />} />
      
    </Routes>
  </Router>
);
