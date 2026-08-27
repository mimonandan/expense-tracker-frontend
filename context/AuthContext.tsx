"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { User } from "@/types/auth";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // LOAD USER
  // =========================

  function loadUser() {

    const accessToken =
      localStorage.getItem(
        "accessToken"
      );

    const userName =
      localStorage.getItem(
        "userName"
      );

    const userRole =
      localStorage.getItem(
        "userRole"
      );

    const userId =
      localStorage.getItem(
        "userId"
      );


    if (
      accessToken &&
      userName &&
      userRole &&
      userId
    ) {

      setUser({
        userId: Number(userId),
        name: userName,
        role: userRole
      });

    } else {

      setUser(null);

    }

    setLoading(false);
  }


  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadUser();

  }, []);


  // =========================
  // REFRESH USER
  // =========================

  function refreshUser() {

    loadUser();

  }


  // =========================
  // LOGOUT
  // =========================

  async function logout() {

    try {

      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      if (refreshToken) {

        const response =
          await fetch(
            "http://localhost:3000/api/auth/logout",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                refreshToken
              })
            }
          );

        if (!response.ok) {

          console.warn(
            "Backend logout returned:",
            response.status
          );

        }
      }

    } catch (error) {

      console.error(
        "Logout API error:",
        error
      );

    } finally {

      // Always clear local session

      localStorage.removeItem(
        "accessToken"
      );

      localStorage.removeItem(
        "refreshToken"
      );

      localStorage.removeItem(
        "userId"
      );

      localStorage.removeItem(
        "userName"
      );

      localStorage.removeItem(
        "userRole"
      );

      setUser(null);

      window.location.href =
        "/login";
    }
  }


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated:
          user !== null,
        logout,
        refreshUser
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}


// =========================
// HOOK
// =========================

export function useAuth() {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;
}