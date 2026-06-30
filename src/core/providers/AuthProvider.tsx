'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Keycloak from 'keycloak-js';
import { keycloak } from '../apiClient';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  keycloak: Keycloak | null;
  login: () => void;
  logout: () => void;
  token: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isInitialized: false,
  keycloak: null,
  login: () => {},
  logout: () => {},
  token: undefined,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current || !keycloak) return;
    initRef.current = true;

    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: typeof window !== 'undefined' ? window.location.origin + '/silent-check-sso.html' : undefined,
      pkceMethod: 'S256',
      checkLoginIframe: false,
      enableLogging: false,
    })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setIsInitialized(true);
      })
      .catch((error) => {
        console.error('Keycloak initialization failed', error);
        setIsInitialized(true);
      });

    keycloak.onTokenExpired = () => {
      const kc = keycloak;
      if (kc) {
        kc.updateToken(30).catch(() => {
          console.error('Failed to refresh token');
          kc.logout();
        });
      }
    };
  }, []);

  const login = () => {
    if (keycloak) {
      keycloak.login().catch(console.error);
    }
  };

  const logout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        keycloak,
        login,
        logout,
        token: keycloak?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
