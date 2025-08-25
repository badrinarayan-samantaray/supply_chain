import React, { useEffect } from "react";

function Profile() {
  useEffect(() => {
    // Redirect to Internet Identity when this page loads
    const iiUrl = "https://identity.ic0.app/";
    window.location.href = iiUrl;
  }, []);

  return (
    <div className="profile-container">
      <h1>Connecting Wallet...</h1>
      <p>Please complete the login using Internet Identity.</p>
    </div>
  );
}

export default Profile;
