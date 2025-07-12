import { AuthClient } from "@dfinity/auth-client";

// Main function to set up wallet connect on the Profile button
export async function setupWalletConnect(profileButtonSelector = "#profile-button") {
  const authClient = await AuthClient.create();

  const login = async () => {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        alert(`Wallet connected! Principal: ${principal}`);
        console.log("Principal ID:", principal);
      },
    });
  };

  // Retry loop to find and attach to the button once it's in the DOM
  const tryAttach = () => {
    const btn = document.querySelector(profileButtonSelector);
    if (btn) {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const isAuthenticated = await authClient.isAuthenticated();
        if (!isAuthenticated) {
          login();
        } else {
          const principal = authClient.getIdentity().getPrincipal().toText();
          alert(`Already connected: ${principal}`);
        }
      });
    } else {
      setTimeout(tryAttach, 500); // Retry every 500ms until button appears
    }
  };

  tryAttach();
}
