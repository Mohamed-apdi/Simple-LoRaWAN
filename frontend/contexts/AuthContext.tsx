'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { keycloak } from '../lib/keycloak';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: () => void;
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false
        });
        
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const userInfo = await keycloak.loadUserInfo();
          setUser(userInfo);
          setToken(keycloak.token!);
        }
      } catch (error) {
        console.log('Keycloak initialization failed:', error);
      }
    };

    // Add event listeners
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(70);
    };

    keycloak.onAuthSuccess = () => {
      setIsAuthenticated(true);
      keycloak.loadUserInfo().then(setUser);
      setToken(keycloak.token!);
    };

    keycloak.onAuthLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    };

    initAuth();
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};