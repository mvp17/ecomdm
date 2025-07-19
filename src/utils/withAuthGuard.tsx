'use client';

import { useKeycloakContext } from '../context/KeycloakContext';
import { JSX, useEffect, useState } from 'react';

const withAuthGuard = (Component: () => JSX.Element) => {
  const AuthGuardWrapper = () => {
    const { authenticated, initialized, keycloak } = useKeycloakContext();
    const [triggeredLogin, setTriggeredLogin] = useState(false);

    useEffect(() => {
      if (initialized && !authenticated && !triggeredLogin) {
        const redirectUri = window.location.href;

        // Save the intended URL before redirect
        sessionStorage.setItem('postLoginRedirect', redirectUri);

        keycloak.login({
          redirectUri,
        });

        setTriggeredLogin(true); // avoid infinite redirect loop
      }
    }, [initialized, authenticated, triggeredLogin, keycloak]);

    if (!initialized) return <p>Loading...</p>;
    if (!authenticated) return null;

    return <Component />;
  };

  AuthGuardWrapper.displayName = `withAuthGuard(${Component.name || 'Component'})`;

  return AuthGuardWrapper;
};

export default withAuthGuard;
