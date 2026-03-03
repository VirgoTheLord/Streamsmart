"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  initials: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Persist auth state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ss_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsLoggedIn(true);
        setUser(parsed);
      }
    } catch {}
  }, []);

  const login = (email: string, name?: string) => {
    const displayName = name || email.split("@")[0];
    const initials = displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const userData: User = { name: displayName, email, initials };
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("ss_auth", JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("ss_auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
