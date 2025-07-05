import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div data-aos="fade-up" data-aos-duration="1000">

            <div className="container">
                <a className="navbar-brand fw-bold" href="#">SupplyChain DApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav ms-auto">
                <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#faq">FAQ</a></li>
                <li className="nav-item"><a className="btn btn-primary ms-2" href="#get-started">Log In</a></li>

            </ul>
            </div>
        </div>
      </div>
    </nav>
  );
}
