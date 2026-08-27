"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement | null>(
      null
    );


  // =========================
  // CLOSE DROPDOWN
  // WHEN CLICKING OUTSIDE
  // =========================

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);

      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================
  // LOGOUT
  // =========================

  async function handleLogout() {

    setOpen(false);

    await logout();
  }


  // =========================
  // USER INITIAL
  // =========================

  const initial =
    user?.name
      ? user.name
          .charAt(0)
          .toUpperCase()
      : "U";


  // =========================
  // UI
  // =========================

  return (

    <nav style={styles.navbar}>

      {/* =========================
          BRAND
      ========================== */}

      <div
        style={styles.brand}
        onClick={() =>
          window.location.href =
            "/"
        }
      >

        <div style={styles.logo}>
          ₹
        </div>

        <div>

          <div style={styles.brandName}>
            ExpenseFlow
          </div>

          <div style={styles.brandTagline}>
            Smart expense tracking
          </div>

        </div>

      </div>


      {/* =========================
          USER MENU
      ========================== */}

      <div
        style={styles.userContainer}
        ref={dropdownRef}
      >

        <button
          style={styles.userButton}
          onClick={() =>
            setOpen(!open)
          }
        >

          <div style={styles.avatar}>
            {initial}
          </div>

          <div style={styles.userInfo}>

            <span style={styles.userName}>
              {user?.name || "User"}
            </span>

            <span style={styles.userRole}>
              {user?.role || "USER"}
            </span>

          </div>

          <span
            style={{
              ...styles.arrow,
              transform: open
                ? "rotate(180deg)"
                : "rotate(0deg)"
            }}
          >
            ▼
          </span>

        </button>


        {/* =========================
            DROPDOWN
        ========================== */}

        {open && (

          <div style={styles.dropdown}>

            {/* USER DETAILS */}

            <div
              style={
                styles.dropdownHeader
              }
            >

              <div
                style={
                  styles.dropdownAvatar
                }
              >
                {initial}
              </div>

              <div>

                <div
                  style={
                    styles.dropdownName
                  }
                >
                  {user?.name || "User"}
                </div>

                <div
                  style={
                    styles.dropdownRole
                  }
                >
                  {user?.role || "USER"}
                </div>

              </div>

            </div>


            <div
              style={
                styles.divider
              }
            />


            {/* LOGOUT */}

            <button
              style={styles.logoutButton}
              onClick={
                handleLogout
              }
            >

              <span>
                🚪
              </span>

              <span>
                Logout
              </span>

            </button>

          </div>

        )}

      </div>

    </nav>
  );
}


// =========================
// STYLES
// =========================

const styles: any = {

  navbar: {
    height: 70,
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
    boxSizing: "border-box"
  },

  // =========================
  // BRAND
  // =========================

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    userSelect: "none"
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0070f3",
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 800
  },

  brandName: {
    fontSize: 19,
    fontWeight: 800,
    color: "#111827"
  },

  brandTagline: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 1
  },

  // =========================
  // USER
  // =========================

  userContainer: {
    position: "relative"
  },

  userButton: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "6px 8px",
    background: "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0070f3",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 16
  },

  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },

  userName: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111827"
  },

  userRole: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2
  },

  arrow: {
    fontSize: 9,
    color: "#6b7280",
    transition:
      "transform 0.2s ease"
  },

  // =========================
  // DROPDOWN
  // =========================

  dropdown: {
    position: "absolute",
    top: 52,
    right: 0,
    width: 220,
    background: "#ffffff",
    borderRadius: 10,
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.12)",
    border:
      "1px solid #e5e7eb",
    overflow: "hidden",
    zIndex: 1000
  },

  dropdownHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 15
  },

  dropdownAvatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0070f3",
    color: "#ffffff",
    fontWeight: 700
  },

  dropdownName: {
    fontWeight: 700,
    fontSize: 14,
    color: "#111827"
  },

  dropdownRole: {
    marginTop: 3,
    fontSize: 12,
    color: "#6b7280"
  },

  divider: {
    height: 1,
    background: "#e5e7eb"
  },

  logoutButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 13,
    background: "#ffffff",
    border: "none",
    cursor: "pointer",
    color: "#dc2626",
    fontSize: 14,
    textAlign: "left"
  }
};