"use client";

import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../lib/keycloak";

interface KeycloakContextProps {
  keycloak: typeof keycloak;
  authenticated: boolean;
  initialized: boolean;
}

const KeycloakContext = createContext<KeycloakContextProps | undefined>(
  undefined
);

export const KeycloakProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        pkceMethod: "S256",
        checkLoginIframe: false,
      })
      .then((auth) => {
        setAuthenticated(auth);
        setInitialized(true);

        if (auth) {
          const redirectPath = sessionStorage.getItem("postLoginRedirect");
          if (redirectPath && window.location.href !== redirectPath) {
            sessionStorage.removeItem("postLoginRedirect");
            window.location.href = redirectPath;
          }
        }
      })
      .catch((err) => {
        console.error("Keycloak initialization error", err);
        setInitialized(true);
      });
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, initialized }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export const useKeycloakContext = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error(
      "useKeycloakContext must be used within a KeycloakProvider"
    );
  }
  return context;
};
