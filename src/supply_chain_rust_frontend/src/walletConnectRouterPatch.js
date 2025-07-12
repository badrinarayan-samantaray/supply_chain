import { AuthClient } from "@dfinity/auth-client";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useWalletConnectOnProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginWithInternetIdentity = async () => {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();

      if (!isAuthenticated) {
        await authClient.login({
          identityProvider: "https://identity.ic0.app/#authorize",
          onSuccess: async () => {
            const principal = authClient.getIdentity().getPrincipal().toText();
            console.log("Login success:", principal);
            // Stay on /profile
          },
          onError: () => {
            console.error("Login failed");
            navigate("/");
          },
        });
      } else {
        const principal = authClient.getIdentity().getPrincipal().toText();
        console.log("Already logged in:", principal);
      }
    };

    if (location.pathname === "/profile") {
      loginWithInternetIdentity();
    }
  }, [location, navigate]);
};
