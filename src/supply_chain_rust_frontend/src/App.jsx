import './index.scss';
import sampleVideo from './assets/VID_20240506_172609331 (1).mp4';
import logo from './assets/image.svg';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import AddProductForm from './components/forms/AddProductForm';
import TransferOwnershipForm from './components/forms/TransferOwnershipForm';
import AddCertificationForm from './components/forms/AddCertificationForm';
import ProductsByOwnerForm from './components/forms/ProductsByOwnerForm';
import VerifyOwnershipForm from './components/forms/VerifyOwnershipForm';
import ViewHistoryForm from './components/forms/ViewHistoryForm';
import ViewProductForm from './components/forms/ViewProductForm';
import DashboardHome from './components/DashboardHome';

function LandingPage() {
  return (
    <>
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={sampleVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Header */}
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
          <a href="#" className="btn">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Because the journey matters</h1>
        <p>
          Our blockchain-based traceability solution enables trust, coordination,
          and transparency in fragmented supply chains.
        </p>
        <Link to="/dashboard/add-product" className="btn">Get Started</Link>
      </section>
    </>
  );
}

function App() {
  return (
    
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard layout and children */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="add-product" element={<AddProductForm />} />
          <Route path="transfer" element={<TransferOwnershipForm />} />
          <Route path="certify" element={<AddCertificationForm />} />
          <Route path="owner" element={<ProductsByOwnerForm />} />
          <Route path="verify" element={<VerifyOwnershipForm />} />
          <Route path="history" element={<ViewHistoryForm />} />
          <Route path="view" element={<ViewProductForm />} />
        </Route>
      </Routes>
    
  );
}

export default App;
