import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss"; // Must be at top
import backgroundVideo from "./assets/VID_20240506_172609331 (1).mp4";
import logo from "./assets/image.svg";

function App() {
  const navigate = useNavigate();

  return (
    <div className="background-wrapper">
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay" />

      {/* Header */}
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          <button className="btn" onClick={() => navigate("/profile")}>
            Profile
          </button>
        </div>
      </div>

      {/* Hero Text */}
      <div className="hero">
        <h1>Because the journey matters</h1>
        <p>
          Our blockchain-based traceability solution enables trust,
          coordination, and transparency in fragmented supply chains.
        </p>
        <button className="btn" onClick={() => navigate("/landing")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
