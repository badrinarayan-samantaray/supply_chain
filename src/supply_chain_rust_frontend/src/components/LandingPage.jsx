// src/components/LandingPage.jsx
import React from 'react';
import 'animate.css';

const LandingPage = () => {
  return (
    <div className="container text-center py-5 animate__animated animate__fadeInUp">
      <h1 className="display-4 fw-bold">Blockchain-Enabled Supply Chain</h1>
      <p className="lead">
        Transparent, tamper-proof tracking from origin to consumer — powered by Internet Computer Protocol.
      </p>
      <a href="#forms" className="btn btn-primary btn-lg mt-4">Get Started</a>
    </div>
  );
};

export default LandingPage;
