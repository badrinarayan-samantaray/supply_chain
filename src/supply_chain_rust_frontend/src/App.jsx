import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss"; // Must be at top
import MatteCubeBackground from "./background/MatteCubeBackground";
import logo from "./assets/Screenshot_2025-07-05_203645-removebg-preview.png";
import { useWalletConnectOnProfile } from "./walletConnectRouterPatch";



function App() {
  useWalletConnectOnProfile();

  const navigate = useNavigate();


  return (
    <div className="background-wrapper">
      {/* Background Video */}
      <MatteCubeBackground />

      {/* Overlay */}
      <div className="overlay" />

      {/* Header */}
      <div className="header">
        <a className="brand" href="/">
  <img src={logo} alt="Cubily logo" className="logo" />
  <span className="brand-name">Cubily</span>
</a>

        <div className="nav-links">
          <button className="btn" onClick={() => navigate("/profile")}>
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Hero Text */}
      <div className="hero">
        <h1>See It. Trust It. Trace It. </h1>
        <h3>— Powered by Blockchain</h3>
        <p>
          Discover the future of supply chain management with our blockchain-based platform. Ensure complete transparency, verify certifications, and trace ownership — from source to shelf — with immutable records and real-time tracking.
        </p>
        <button className="btn" onClick={() => navigate("/landing")}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
