"use client";

import { useEffect, useState } from "react";

import { logout } from "@/lib/auth";

export default function Navbar() {

  const [userName, setUserName] =
    useState("");

  const [showMenu, setShowMenu] =
    useState(false);

  useEffect(() => {

    const name =
      localStorage.getItem("userName");

    if (name) {
      setUserName(name);
    }

  }, []);

  return (

    <div style={styles.navbar}>

      {/* LEFT SECTION */}

      <div>

        <h1 style={styles.logo}>
          💰 ExpenseFlow
        </h1>

        <p style={styles.tagline}>
          Track smarter. Spend better.
        </p>

      </div>

      {/* USER MENU */}

      <div style={styles.userSection}>

        <button
          style={styles.userButton}
          onClick={() =>
            setShowMenu(!showMenu)
          }
        >
          {userName} ▼
        </button>

        {showMenu && (

          <div style={styles.dropdown}>

            <button
              style={styles.logoutButton}
              onClick={logout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

const styles: any = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "18px 30px",
    boxShadow:
      "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: 20
  },

  logo: {
    margin: 0,
    fontSize: 30,
    fontWeight: "bold",
    color: "#0070f3"
  },

  tagline: {
    margin: 0,
    marginTop: 4,
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
    paddingLeft: 8
  },

  userSection: {
    position: "relative"
  },

  userButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 14
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: 50,
    background: "#fff",
    borderRadius: 8,
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.12)",
    overflow: "hidden",
    minWidth: 140
  },

  logoutButton: {
    padding: "12px 20px",
    border: "none",
    background: "#fff",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
    fontSize: 14
  }
};