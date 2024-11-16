import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  const token = localStorage.getItem("access-token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/Users/refresh-token`,
      { refreshToken }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("access-token", res.data.data.accessToken);
    localStorage.setItem("refresh-token", res.data.data.refreshToken);

    return res.data.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
