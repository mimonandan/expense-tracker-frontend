import api from "@/lib/axios";

export async function loginUser(email: string, password: string) {
  const res = await api.post("/auth/login", {
    email,
    password
  });

  return res.data.data;
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refreshToken");

  return api.post("/auth/logout", {
    refreshToken
  });
}