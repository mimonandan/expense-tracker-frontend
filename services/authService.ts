import { apiRequest } from "@/lib/api";

export async function loginUser(email: string, password: string) {
  const res = await apiRequest("/auth/login", "POST", {
    email,
    password
  });

  return res.data;
}

export async function logoutUser() {
  const refreshToken = localStorage.getItem("refreshToken");

  return apiRequest("/auth/logout", "POST", {
    refreshToken
  });
}