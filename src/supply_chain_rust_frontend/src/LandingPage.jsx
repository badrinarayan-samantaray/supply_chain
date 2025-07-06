import './index.scss';
import sampleVideo from './assets/VID_20240506_172609331 (1).mp4';
import logo from './assets/Screenshot_2025-07-05_203645-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={sampleVideo} type="video/mp4" />
      </video>

      {/* Logo and Navbar */}
      <div className="top-bar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-links">
          <Link to="/add-product">Add Product</Link>
          <Link to="/transfer-ownership">Transfer Ownership</Link>
          <Link to="/add-certification">Add Certification</Link>
          <Link to="/products-by-owner">By Owner</Link>
          <Link to="/verify-ownership">Verify Ownership</Link>
          <Link to="/view-history">View History</Link>
          <Link to="/view-product">View Product</Link>
          <button className="profile-button" onClick={() => navigate("/profile")}>Profile</button>
        </div>
      </div>

      {/* Landing Content */}
      <div className="hero-section">
        <h1 className="hero-heading">Because the journey matters</h1>
        <p className="hero-description">
          Our blockchain-based traceability solution enables trust, coordination, and transparency
          in fragmented supply chains.
        </p>
      </div>
    </>
  );
}

export default LandingPage;
