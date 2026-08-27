import api from "@/lib/axios";

// =========================
// LOGIN
// =========================

export async function loginUser(
  email: string,
  password: string
) {
  const res = await api.post(
    "/auth/login",
    {
      email: email.trim().toLowerCase(),
      password
    }
  );

  return res.data.data;
}


// =========================
// REGISTER
// =========================

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await api.post(
    "/auth/register",
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    }
  );

  return res.data;
}


// =========================
// FORGOT PASSWORD
// =========================

export async function forgotPassword(
  email: string
) {
  const res = await api.post(
    "/auth/forgot-password",
    {
      email: email.trim().toLowerCase()
    }
  );

  return res.data;
}


// =========================
// RESET PASSWORD
// =========================

export async function resetPassword(
  resetToken: string,
  newPassword: string
) {
  const res = await api.post(
    "/auth/reset-password",
    {
      resetToken,
      newPassword
    }
  );

  return res.data;
}


// =========================
// LOGOUT
// =========================

export async function logoutUser() {
  const refreshToken =
    localStorage.getItem(
      "refreshToken"
    );

  return api.post(
    "/auth/logout",
    {
      refreshToken
    }
  );
}