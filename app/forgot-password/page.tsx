"use client";

import { useState } from "react";

import {
  forgotPassword
} from "@/services/authService";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [resetToken, setResetToken] =
    useState("");


  // =========================
  // SUBMIT
  // =========================

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setError("");
    setSuccess("");
    setResetToken("");

    if (!email.trim()) {
      setError(
        "Email is required"
      );
      return;
    }

    try {

      setLoading(true);

      const result =
        await forgotPassword(email);

      setSuccess(
        result.data?.message ||
        "Password reset request created."
      );

      /*
       * DEVELOPMENT ONLY
       *
       * Backend currently returns the
       * reset token because we don't have
       * email delivery implemented yet.
       */

      if (result.data?.resetToken) {
        setResetToken(
          result.data.resetToken
        );
      }

    } catch (err: any) {

      console.log(
        "FORGOT PASSWORD ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message ||
        "Unable to process request"
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

        <h2 style={styles.title}>
          Forgot Password?
        </h2>

        <p style={styles.subtitle}>
          Enter your registered email and
          we'll help you reset your password.
        </p>


        <form
          onSubmit={handleSubmit}
        >

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
              ? "Processing..."
              : "Reset Password"}

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


        {/* DEVELOPMENT RESET TOKEN */}

        {resetToken && (

          <div style={styles.tokenBox}>

            <p style={styles.tokenTitle}>
              Development Reset Token
            </p>

            <p style={styles.tokenWarning}>
              This is shown only because email
              delivery is not configured yet.
            </p>

            <textarea
              style={styles.token}
              value={resetToken}
              readOnly
            />

            <button
              style={styles.resetButton}
              onClick={() => {

                sessionStorage.setItem(
                  "resetToken",
                  resetToken
                );

                window.location.href =
                  "/reset-password";

              }}
            >
              Continue to Reset Password
            </button>

          </div>

        )}


        {/* BACK TO LOGIN */}

        <p style={styles.linkText}>

          Remember your password?

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
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa",
    padding: 20
  },

  card: {
    width: 400,
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
    lineHeight: 1.5,
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

  tokenBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    background: "#fff8e1",
    border: "1px solid #f0c36d"
  },

  tokenTitle: {
    margin: 0,
    fontWeight: "bold"
  },

  tokenWarning: {
    fontSize: 12,
    color: "#856404"
  },

  token: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 80,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 12,
    resize: "none"
  },

  resetButton: {
    width: "100%",
    padding: 10,
    background: "#2ed573",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
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