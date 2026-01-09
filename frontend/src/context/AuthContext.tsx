"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = Cookies.get("access_token");

    if (!token) {
      setLoading(false);
      return;
    }
    try {
      console.log("ENVIANDO ESTO:", `Bearer ${token}`);
      const response = await fetch("http://127.0.0.1:8000/api/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        Cookies.remove("access_token");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refreshUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("'useAuth must be used within an AuthProvider");
  }

  return context;
};
