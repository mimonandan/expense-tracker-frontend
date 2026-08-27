"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  loginUser
} from "@/services/authService";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const errorTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  useEffect(() => {

    return () => {

      if (errorTimer.current) {

        clearTimeout(
          errorTimer.current
        );

      }

    };

  }, []);

  function showError(
    message: string
  ) {

    // Clear any previous timer

    if (errorTimer.current) {

      clearTimeout(
        errorTimer.current
      );

    }

    setError(message);

    errorTimer.current =
      setTimeout(() => {

        setError("");

        errorTimer.current = null;

      }, 3000);
  }


  // =========================
  // LOGIN
  // =========================

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    // Don't immediately clear the existing
    // error here because it should remain
    // visible for its full 3 seconds.

    if (!email.trim()) {

      showError(
        "Email is required"
      );

      return;
    }

    if (!password) {

      showError(
        "Password is required"
      );

      return;
    }

    try {

      setLoading(true);

      const data =
        await loginUser(
          email,
          password
        );

      // =========================
      // STORE TOKENS
      // =========================

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      localStorage.setItem(
        "userName",
        data.name
      );

      localStorage.setItem(
        "userRole",
        data.role
      );

      window.location.href = "/";

    } catch (err: any) {

      console.log(
        "LOGIN ERROR:",
        err
      );

      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Login failed";

      showError(
        errorMessage
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Welcome Back
        </h2>

        <p style={styles.subtitle}>
          Login to manage your expenses.
        </p>


        <form
          onSubmit={handleLogin}
        >

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
              setEmail(
                e.target.value
              )
            }
          />


          {/* PASSWORD */}

          <label style={styles.label}>
            Password
          </label>

          <input
            style={styles.input}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />


          {/* FORGOT PASSWORD */}

          <p style={styles.forgotPassword}>

            <span
              style={styles.link}
              onClick={() =>
                window.location.href =
                  "/forgot-password"
              }
            >
              Forgot password?
            </span>

          </p>


          {/* LOGIN BUTTON */}

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
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* ERROR */}

        {error && (

          <div style={styles.error}>
            {error}
          </div>

        )}


        {/* REGISTER */}

        <p style={styles.linkText}>

          Don't have an account?

          <span
            style={styles.link}
            onClick={() =>
              window.location.href =
                "/register"
            }
          >
            {" "}Register
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

  forgotPassword: {
    textAlign: "right",
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
    padding: 12,
    borderRadius: 6,
    background: "#ffe5e5",
    color: "#d63031",
    fontWeight: "500"
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