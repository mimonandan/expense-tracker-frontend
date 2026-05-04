const BASE_URL = "http://localhost:3000/api";

let isRefreshing = false;
let failedQueue: any[] = [];

function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  localStorage.setItem("accessToken", data.data.accessToken);

  return data.data.accessToken;
}

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body?: any
) {
  const token = localStorage.getItem("accessToken");

  const makeRequest = async (accessToken: string | null) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` })
      },
      ...(body && { body: JSON.stringify(body) })
    });
  };

  let res = await makeRequest(token);

  // If token expired → try refresh
  if (res.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);

        res = await makeRequest(newToken);
      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        throw err;
      } finally {
        isRefreshing = false;
      }
    } else {
      // queue requests while refreshing
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: async (token: string) => {
            const retryRes = await makeRequest(token);
            resolve(retryRes.json());
          },
          reject: (err: any) => reject(err)
        });
      });
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}