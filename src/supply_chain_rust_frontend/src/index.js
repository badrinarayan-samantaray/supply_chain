import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { setupWalletConnect } from './walletConnect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Delay initialization to let React render first
setTimeout(() => {
  setupWalletConnect(); // Default: waits for #profile-button
}, 1000);
