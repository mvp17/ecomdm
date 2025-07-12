"use client";

import { useEffect, useState } from "react";
import keycloak from "@/lib/keycloak";

export default function LoginButton() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: "S256",
        checkLoginIframe: true,
      })
      .then((auth) => {
        setAuthenticated(auth);
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
      });
  }, []);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <button
      onClick={authenticated ? logout : login}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
    >
      {authenticated ? "Logout" : "Login"}
    </button>
  );
}
