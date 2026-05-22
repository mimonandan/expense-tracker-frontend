import {
  logoutUser
} from "@/services/authService";

export async function logout() {

  try {

    await logoutUser();

  } catch (e) {}

  localStorage.removeItem(
    "accessToken"
  );

  localStorage.removeItem(
    "refreshToken"
  );

  localStorage.removeItem(
    "userName"
  );

  window.location.href =
    "/login";
}