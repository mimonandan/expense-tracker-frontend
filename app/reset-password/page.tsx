"use client";

import {
  useEffect,
  useState
} from "react";

import {
  resetPassword
} from "@/services/authService";

export default function ResetPasswordPage() {

  const [resetToken, setResetToken] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  // =========================
  // LOAD TOKEN
  // =========================

  useEffect(() => {

    const token =
      sessionStorage.getItem(
        "resetToken"
      );

    if (token) {
      setResetToken(token);
    }

  }, []);


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
  // RESET PASSWORD
  // =========================

  async function handleReset(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!resetToken.trim()) {
      setError(
        "Reset token is required"
      );
      return;
    }

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {

      setLoading(true);

      const result =
        await resetPassword(
          resetToken.trim(),
          password
        );

      setSuccess(
        result.data?.message ||
        "Password reset successfully."
      );

      // Remove one-time reset token

      sessionStorage.removeItem(
        "resetToken"
      );

      // Clear fields

      setResetToken("");
      setPassword("");
      setConfirmPassword("");

      // Redirect after 2 seconds

      setTimeout(() => {

        window.location.href =
          "/login";

      }, 2000);

    } catch (err: any) {

      console.log(
        "RESET PASSWORD ERROR:",
        err
      );

      setError(
        err.response?.data?.error ||
        err.message ||
        "Unable to reset password"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Reset Password
        </h2>

        <p style={styles.subtitle}>
          Create a new strong password for
          your account.
        </p>


        <form
          onSubmit={handleReset}
        >

          {/* RESET TOKEN */}

          <label style={styles.label}>
            Reset Token
          </label>

          <textarea
            style={styles.tokenInput}
            placeholder="Enter reset token"
            value={resetToken}
            onChange={(e) =>
              setResetToken(
                e.target.value
              )
            }
          />


          {/* PASSWORD */}

          <label style={styles.label}>
            New Password
          </label>

          <input
            style={styles.input}
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <p style={styles.passwordHint}>
            Minimum 8 characters with uppercase,
            lowercase, number and special character.
          </p>


          {/* CONFIRM PASSWORD */}

          <label style={styles.label}>
            Confirm Password
          </label>

          <input
            style={styles.input}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />


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
              ? "Resetting..."
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


        {/* LOGIN */}

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

  tokenInput: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: 90,
    padding: 10,
    marginBottom: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 12,
    resize: "vertical"
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