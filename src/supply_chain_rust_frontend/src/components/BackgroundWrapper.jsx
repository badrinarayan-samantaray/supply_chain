import React from "react";
import MatteCubeBackground from "../background/MatteCubeBackground";
import logo from "../assets/Screenshot_2025-07-05_203645-removebg-preview.png";
import { Link } from "react-router-dom";

const BackgroundWrapper = ({ children }) => {
  return (
      <><MatteCubeBackground /><div className="overlay"></div><header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" height="40" />
      </div>
      <nav className="nav-links">
        <Link to="/landing">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/transfer-ownership">Transfer Ownership</Link>
        <Link to="/add-certification">Add Certification</Link>
        <Link to="/products-by-owner">By Owner</Link>
        <Link to="/verify-ownership">Verify Ownership</Link>
        <Link to="/view-history">View History</Link>
        <Link to="/view-product">View Product</Link>
      </nav>
    </header><div className="content-overlay">{children}</div></>
    
  );
};

export default BackgroundWrapper;
