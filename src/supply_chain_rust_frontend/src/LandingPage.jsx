import './index.scss';
import MatteCubeBackground from "./background/MatteCubeBackground";
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
     <MatteCubeBackground />

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
          <button className="profile-button" onClick={() => navigate("/profile")}>Connect Wallet</button>
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
        <h1 className="right-heading">Unveiling the Product's Journey: From Origin to Destination</h1>
        <p className="right-description">
           Leveraging the immutability and decentralized nature of blockchain technology, this section details the system's capabilities for real-time tracking of ordered products from their point of origin to their final destination.
        </p>
         <button className="btn" onClick={() => navigate("/")}>
          Track Orders
        </button>
      </div>
      <div className="sechero-section">
        <h1 className="sechero-heading">Addressing the Hurdles: Issues in Blockchain-Powered Supply Chains</h1>
        <p className="sechero-description">
           The challenges hindering the widespread adoption and effectiveness of blockchain for enhancing supply chain transparency. These issues include scalability, interoperability, data privacy, and the complexities associated with integrating blockchain into existing supply chain systems.
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
