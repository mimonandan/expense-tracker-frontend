"use client";

import { useState } from "react";

import {
  registerUser
} from "@/services/authService";

export default function RegisterPage() {

  // =========================
  // STATES
  // =========================

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =========================
  // REGISTER
  // =========================

  async function handleRegister(
    e: any
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");
      setSuccess("");

      await registerUser(
        name,
        email,
        password
      );

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      // redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err: any) {

      console.log(
        "REGISTER ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message
      );

    } finally {

      setLoading(false);

    }
  }

  // =========================
  // UI
  // =========================

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>Create Account</h2>

        <form
          onSubmit={handleRegister}
        >

          {/* NAME */}

          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* EMAIL */}

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {/* BUTTON */}

          <button
            style={styles.button}
            type="submit"
          >

            {loading
              ? "Creating..."
              : "Register"}

          </button>

        </form>

        {/* ERROR */}

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {/* SUCCESS */}

        {success && (
          <p style={styles.success}>
            {success}
          </p>
        )}

        {/* LOGIN LINK */}

        <p style={styles.linkText}>

          Already have an account?

          <span
            style={styles.link}
            onClick={() =>
              window.location.href =
                "/login"
            }
          >
            {" "}Login
          </span>

        </p>

      </div>

    </div>
  );
}

// =========================
// STYLES
// =========================

const styles: any = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa"
  },

  card: {
    width: 350,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow:
      "0 5px 15px rgba(0,0,0,0.1)"
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },

  error: {
    color: "red",
    marginTop: 15
  },

  success: {
    color: "green",
    marginTop: 15
  },

  linkText: {
    marginTop: 20,
    textAlign: "center"
  },

  link: {
    color: "#0070f3",
    cursor: "pointer",
    fontWeight: "bold"
  }
};