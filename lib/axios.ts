import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type":
      "application/json"
  }
});

export default api;

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    console.log(
      "TOKEN IN INTERCEPTOR:",
      token
    );

    if (token) {

      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

let isRefreshing = false;

let failedQueue: any[] = [];

const processQueue = (
  error: any,
  token: string | null = null
) => {

  failedQueue.forEach(
    (prom) => {

      if (error) {

        prom.reject(error);

      } else {

        prom.resolve(token);

      }

    }
  );

  failedQueue = [];
};

api.interceptors.response.use(

  (response) =>
    response,

  async (error) => {

    const originalRequest =
      error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry
    ) {

      originalRequest._retry =
        true;

      if (isRefreshing) {

        return new Promise(
          (resolve, reject) => {

            failedQueue.push({
              resolve,
              reject
            });

          }
        )
          .then((token) => {

            originalRequest
              .headers
              .Authorization =
              `Bearer ${token}`;

            return api(
              originalRequest
            );

          })
          .catch((err) =>
            Promise.reject(err)
          );
      }

      isRefreshing = true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );


        if (!refreshToken) {

          throw new Error(
            "Refresh token not found"
          );
        }


        const res =
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
              refreshToken
            }
          );


        const newAccessToken =
          res.data.data.accessToken;


        const newRefreshToken =
          res.data.data.refreshToken;


        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        if (newRefreshToken) {

          localStorage.setItem(
            "refreshToken",
            newRefreshToken
          );
        }

        api.defaults.headers.common
          .Authorization =
          `Bearer ${newAccessToken}`;


        processQueue(
          null,
          newAccessToken
        );

        originalRequest
          .headers
          .Authorization =
          `Bearer ${newAccessToken}`;

        return api(
          originalRequest
        );

      } catch (err) {

        processQueue(
          err,
          null
        );


        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem(
          "userId"
        );

        localStorage.removeItem(
          "userName"
        );

        localStorage.removeItem(
          "userRole"
        );



        window.location.href =
          "/login";

        return Promise.reject(
          err
        );

      } finally {

        isRefreshing =
          false;
      }
    }


    return Promise.reject(
      error
    );
  }
);