import axios from "axios";
import { toast } from "react-hot-toast";
import { store } from "../redux/store";
import { logout } from "../features/auth/authSlice";
import { clearProfile } from "../features/user/userSlice";
import { tokenService } from "../utils/tokenService";
import { encryptData, decryptData } from "../utils/encryptionHelper";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isHandlingSessionExpiry = false;

const hasSessionExpired = (payload: any) => {
  const message = String(
    payload?.message || payload?.error || "",
  ).toLowerCase();

  const isPublicPage =
    window.location.pathname === "/login" ||
    window.location.pathname === "/forgot-password";

  // Don't trigger session expiry if auth: false is received on a public page
  // unless it explicitly mentions session/token expiry
  if (isPublicPage && payload?.auth === false) {
    return (
      message.includes("session expired") ||
      message.includes("token expired") ||
      message.includes("jwt expired")
    );
  }

  return (
    payload?.auth === false ||
    message.includes("session expired") ||
    message.includes("token expired") ||
    message.includes("jwt expired") ||
    message.includes("unauthorized")
  );
};

const handleSessionExpiry = () => {
  if (isHandlingSessionExpiry) {
    return;
  }

  isHandlingSessionExpiry = true;
  tokenService.clearTokens();
  store.dispatch(logout());
  store.dispatch(clearProfile());
  if (window.location.pathname !== "/login") {
    toast.error("Session expired. Please login again.");
    window.location.replace("/login");
    return;
  }

  window.setTimeout(() => {
    isHandlingSessionExpiry = false;
  }, 1000);
};

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      // if (
      //   config.data &&
      //   !(config as any)._isEncrypted &&
      //   !(config.data instanceof FormData)
      // ) {
      //   console.log(config.data,">>>>>>>>config data ")
      //   const encryptedPayload = encryptData(config.data);
      //   if (encryptedPayload.iv || !config.data.iv) {
      //     config.data = encryptedPayload;
      //   }
      // }
    } catch (error) {
      console.error("Request encryption error:", error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Decrypt response payload
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      if (response.data && response.data.encrypted) {
        response.data = decryptData(response.data);
        console.log("decrypted", response.data);
      }

      if (hasSessionExpired(response.data)) {
        handleSessionExpiry();
        return Promise.reject(
          new Error("Session expired. Please login again."),
        );
      }
    } catch (error) {
      console.error("Response decryption error:", error);
    }
    return response;
  },
  (error) => {
    try {
      // Decrypt error response if it's encrypted
      if (
        error.response &&
        error.response.data &&
        error.response.data.encrypted
      ) {
        error.response.data = decryptData(error.response.data);
        console.log("error response decrypted", error.response.data);
      }

      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        hasSessionExpired(error.response?.data)
      ) {
        handleSessionExpiry();
      }
    } catch (decryptError) {
      console.error("Error response decryption failed:", decryptError);
    }
    return Promise.reject(error); // still reject so catch() runs
  },
);

export default axiosInstance;
