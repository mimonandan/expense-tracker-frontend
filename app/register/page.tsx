"use client";

import { useState } from "react";

import {
  registerUser
} from "@/services/authService";

export default function RegisterPage() {

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
  // PASSWORD VALIDATION
  // =========================

  function validatePassword(
    password: string
  ) {

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    if (
      !/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'+=~`]/.test(
        password
      )
    ) {
      return "Password must contain at least one special character";
    }

    return "";
  }


  // =========================
  // REGISTER
  // =========================

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Name validation

    if (!name.trim()) {
      setError(
        "Name is required"
      );
      return;
    }

    if (name.trim().length < 2) {
      setError(
        "Name must be at least 2 characters long"
      );
      return;
    }

    // Email validation

    if (!email.trim()) {
      setError(
        "Email is required"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        email.trim()
      )
    ) {
      setError(
        "Please enter a valid email address"
      );
      return;
    }

    // Password validation

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {

      setLoading(true);

      await registerUser(
        name,
        email,
        password
      );

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.href =
          "/login";
      }, 1500);

    } catch (err: any) {

      console.log(
        "REGISTER ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Create Account
        </h2>

        <p style={styles.subtitle}>
          Start managing your expenses smarter.
        </p>

        <form
          onSubmit={handleRegister}
        >

          {/* NAME */}

          <label style={styles.label}>
            Name
          </label>

          <input
            style={styles.input}
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* EMAIL */}

          <label style={styles.label}>
            Email
          </label>

          <input
            style={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* PASSWORD */}

          <label style={styles.label}>
            Password
          </label>

          <input
            style={styles.input}
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <p style={styles.passwordHint}>
            Minimum 8 characters with uppercase,
            lowercase, number and special character.
          </p>

          {/* BUTTON */}

          <button
            style={
              loading
                ? styles.buttonDisabled
                : styles.button
            }
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating..."
              : "Create Account"}

          </button>

        </form>

        {/* ERROR */}

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div style={styles.success}>
            {success}
          </div>
        )}

        {/* LOGIN */}

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

const styles: any = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
    padding: 20
  },

  card: {
    width: 380,
    background: "#fff",
    padding: 32,
    borderRadius: 14,
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.10)"
  },

  title: {
    margin: 0,
    fontSize: 26
  },

  subtitle: {
    color: "#666",
    marginBottom: 25
  },

  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: "bold",
    fontSize: 14
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },

  passwordHint: {
    fontSize: 12,
    color: "#777",
    marginTop: -8,
    marginBottom: 18
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

  buttonDisabled: {
    width: "100%",
    padding: 12,
    background: "#9bbce8",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "not-allowed",
    fontWeight: "bold"
  },

  error: {
    marginTop: 15,
    padding: 10,
    borderRadius: 6,
    background: "#ffe5e5",
    color: "#d63031"
  },

  success: {
    marginTop: 15,
    padding: 10,
    borderRadius: 6,
    background: "#e5f8ed",
    color: "#16834b"
  },

  linkText: {
    marginTop: 22,
    textAlign: "center",
    color: "#555"
  },

  link: {
    color: "#0070f3",
    cursor: "pointer",
    fontWeight: "bold"
  }
};