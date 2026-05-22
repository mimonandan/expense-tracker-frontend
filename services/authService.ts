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
      email,
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
      name,
      email,
      password
    }
  );

  return res.data;
}

// =========================
// LOGOUT
// =========================

export async function logoutUser() {

  const refreshToken =
    localStorage.getItem("refreshToken");

  return api.post(
    "/auth/logout",
    {
      refreshToken
    }
  );
}