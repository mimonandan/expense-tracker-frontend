import { logoutUser } from "../services/authService";

export async function logout() {
  try {
    await logoutUser(); // backend logout
  } catch (e) {}

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  
  window.location.href = "/login";
}