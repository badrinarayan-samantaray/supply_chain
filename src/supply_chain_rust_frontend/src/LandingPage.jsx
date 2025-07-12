import './index.scss';
import sampleVideo from './assets/VID_20240506_172609331 (1).mp4';
import logo from './assets/Screenshot_2025-07-05_203645-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';


function LandingPage() {
  const navigate = useNavigate();
    const containerRef = useRef(null);
  const [showScrollGuide, setShowScrollGuide] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current.scrollTop > 20) {
        setShowScrollGuide(false);
      } else {
        setShowScrollGuide(true);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
      <div className="landing-scroll-container"  ref={containerRef}>
      <div className="hero-section">
        <h1 className="hero-heading">Blockchain for Supply Chain: From Origin to Ownership</h1>
        <p className="hero-description">
         Enhance consumer trust and regulatory compliance with end-to-end visibility. Our blockchain-powered solution guarantees product authenticity, secure data, and transparent ownership records.
        </p>
         <button className="btn" onClick={() => navigate("/")}>
          Explore Products
        </button>
      </div>
      <div className="right-section">
        <h1 className="right-heading">Blockchain for Supply Chain: From Origin to Ownership</h1>
        <p className="right-description">
           Enhance consumer trust and regulatory compliance with end-to-end visibility. Our blockchain-powered solution guarantees product
        </p>
         <button className="btn" onClick={() => navigate("/")}>
          Track Orders
        </button>
      </div>
      <div className="sechero-section">
        <h1 className="sechero-heading">Blockchain for Supply Chain: From Origin to Ownership</h1>
        <p className="sechero-description">
           Enhance consumer trust and regulatory compliance with end-to-end visibility. Our blockchain-powered solution guarantees product
        </p>
         <button className="btn" onClick={() => navigate("/")}>
          Having Issues?
        </button>
      </div>
      </div>
        {/* Scroll Guide (only when at top) */}
      {showScrollGuide && (
        <div className="scroll-guide">
          <div>Uncover More</div>
          <span>↓</span>
        </div>
      )}
    </>
  );
}

export default LandingPage;
