import './index.scss';
import sampleVideo from './assets/VID_20240506_172609331 (1).mp4';
import logo from './assets/1782328_427236550775928_2158228152519053711_o.svg';

function App() {
  return (
    <>
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted playsInline>
        <source src={sampleVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Header with Sidebar Buttons in Navbar */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" height="40" />
        </div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Add Product</a>
          <a href="#">Transfer Ownership</a>
          <a href="#">Add Certification</a>
          <a href="#">By Owner</a>
          <a href="#">Verify Ownership</a>
          <a href="#">View History</a>
          <a href="#">View Product</a>
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
        <a href="#" className="btn">Get Started</a>
      </section>
    </>
  );
}

export default App;
