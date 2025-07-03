// import { useState } from 'react';
// import { supply_chain_rust_backend } from 'declarations/supply_chain_rust_backend';

// function App() {
  // const [greeting, setGreeting] = useState('');

  // function handleSubmit(event) {
    // event.preventDefault();
    // const name = event.target.elements.name.value;
    // supply_chain_rust_backend.greet(name).then((greeting) => {
      // setGreeting(greeting);
    // });
    // return false;
  // }

  // return (
    // <main>
      // <img src="/logo2.svg" alt="DFINITY logo" />
      // <br />
      // <br />
      // <form action="#" onSubmit={handleSubmit}>
        // <label htmlFor="name">Enter your name: &nbsp;</label>
        // <input id="name" alt="Name" type="text" />
        // <button type="submit">Click Me!</button>
      // </form>
      // <section id="greeting">{greeting}</section>
    // </main>
  // );
// }

// export default App;



// src/App.jsx
import React from "react";
import "./index.scss";
import LandingPage from "./components/LandingPage";
import AddProductForm from "./components/forms/AddProductForm";
import TransferOwnershipForm from "./components/forms/TransferOwnershipForm";
import VerifyOwnershipForm from "./components/forms/VerifyOwnershipForm";
import AddCertificationForm from "./components/forms/AddCertificationForm";
import ProductsByOwnerForm from "./components/forms/ProductsByOwnerForm";
import ViewProductForm from "./components/forms/ViewProductForm";
import ViewHistoryForm from "./components/forms/ViewHistoryForm";

const App = () => {
  return (
  
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-5">
        <a className="navbar-brand fw-bold" href="#">
          OptiTrack
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary text-white ms-2" href="#get-started">
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-fluid py-5 bg-light text-dark">
        <div className="row align-items-center">
          <div className="col-md-6 px-5">
            <h1 className="display-5 fw-bold">
              Dynamic Supply Chain Transparency
            </h1>
            <p className="lead">
              Track every movement from origin to consumer, powered by blockchain on ICP.
            </p>
            <a href="#get-started" className="btn btn-primary px-4 me-2">
              Get Started
            </a>
            <a href="#our-platform" className="btn btn-outline-secondary px-4">
              Our Platform
            </a>
          </div>
          <div className="col-md-6 text-center">
            <video
              className="img-fluid rounded shadow"
              autoPlay
              loop
              muted
              style={{ maxHeight: "360px" }}
            >
              <source
                src="https://cdn.dribbble.com/userupload/43731139/file/original-b7214a7a1336900fd8804d34f73aa5db.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    
      {/* Additional Animated Section */}
      <LandingPage />

      {  /* Forms Section */}
      <div id="forms" className="container my-5">
        <AddProductForm />
        <AddCertificationForm/>
        <ProductsByOwnerForm />
        <TransferOwnershipForm />
        <VerifyOwnershipForm />
        <ViewHistoryForm />
        <ViewProductForm />
      </div>
    </div>
  );
};

export default App;

