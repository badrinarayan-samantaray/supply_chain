import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/VID_20240506_172609331 (1).mp4";
import logo from "../assets/image.svg";
import "../index.scss"

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Header with Nav */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" height="40" />
        </div>
        <nav className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard/add-product">Add Product</Link></li>
            <li><Link to="/dashboard/transfer">Transfer Ownership</Link></li>
            <li><Link to="/dashboard/certify">Add Certification</Link></li>
            <li><Link to="/dashboard/owner">By Owner</Link></li>
            <li><Link to="/dashboard/verify">Verify Ownership</Link></li>
            <li><Link to="/dashboard/history">View History</Link></li>
            <li><Link to="/dashboard/view">View Product</Link></li>
            <li><button className="btn btn-outline-light">Contact</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero-content">
        <h1>Because the journey matters</h1>
        <p>
          Our blockchain-based traceability solution enables trust, coordination,
          and transparency in fragmented supply chains.
        </p>
        <Link to="/dashboard/add-product">
          <button className="btn btn-light">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
