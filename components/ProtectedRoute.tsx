"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children
}: ProtectedRouteProps) {

  const router = useRouter();

  const {
    loading,
    isAuthenticated
  } = useAuth();


  // =========================
  // AUTH CHECK
  // =========================

  useEffect(() => {

    if (
      !loading &&
      !isAuthenticated
    ) {
      router.replace("/login");
    }

  }, [
    loading,
    isAuthenticated,
    router
  ]);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div style={styles.loadingPage}>

        <div style={styles.loadingCard}>

          <div style={styles.icon}>
            🔐
          </div>

          <p style={styles.text}>
            Checking authentication...
          </p>

        </div>

      </div>
    );
  }


  // =========================
  // NOT AUTHENTICATED
  // =========================

  if (!isAuthenticated) {
    return null;
  }


  // =========================
  // AUTHENTICATED
  // =========================

  return <>{children}</>;
}

const styles: any = {

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  loadingCard: {
    padding: 30,
    background: "#ffffff",
    borderRadius: 12,
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.06)",
    textAlign: "center"
  },

  icon: {
    fontSize: 30,
    marginBottom: 10
  },

  text: {
    margin: 0,
    color: "#6b7280"
  }
};