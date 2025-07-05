import React from "react";
import bgVideo from "../assets/VID_20240506_172609331 (1).mp4";
import logo from "../assets/image.svg";
import { Link } from "react-router-dom";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="background-wrapper">
      <video autoPlay muted loop className="background-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay"></div>

      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" height="40" />
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard/add-product">Add Product</Link>
          <Link to="/dashboard/transfer">Transfer Ownership</Link>
          <Link to="/dashboard/certify">Add Certification</Link>
          <Link to="/dashboard/owner">By Owner</Link>
          <Link to="/dashboard/verify">Verify Ownership</Link>
          <Link to="/dashboard/history">View History</Link>
          <Link to="/dashboard/view">View Product</Link>
        </nav>
      </header>

      <div className="content-overlay">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
