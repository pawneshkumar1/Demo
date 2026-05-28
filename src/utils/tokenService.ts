import { encryptStoredData, decryptStoredData } from "./encryptionHelper";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_TYPE_KEY = "userType";

// Keep tokens in memory so they can't be modified via devtools session storage edits
let _accessToken: string | null = null;
let _refreshToken: string | null = null;

const readStoredToken = (key: string): string | null => {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (parsed?.encrypted && parsed?.data && parsed?.iv) {
      const decrypted = decryptStoredData(parsed);
      return decrypted?.token || null;
    }

    if (typeof parsed === "string") {
      return parsed;
    }

    return parsed?.token || null;
  } catch {
    return sessionStorage.getItem(key);
  }
};

export const tokenService = {
  getAccessToken: (): string | null => {
    if (_accessToken) return _accessToken;
    _accessToken = readStoredToken(TOKEN_KEY);
    return _accessToken;
  },

  getRefreshToken: (): string | null => {
    if (_refreshToken) return _refreshToken;
    _refreshToken = readStoredToken(REFRESH_KEY);
    return _refreshToken;
  },

  setTokens: (accessToken: string, refreshToken?: string): void => {
    _accessToken = accessToken;
    const encAccess = encryptStoredData({ token: accessToken });
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(encAccess));

    if (refreshToken) {
      _refreshToken = refreshToken;
      const encRefresh = encryptStoredData({ token: refreshToken });
      sessionStorage.setItem(REFRESH_KEY, JSON.stringify(encRefresh));
    }
  },

  clearTokens: (): void => {
    _accessToken = null;
    _refreshToken = null;
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.removeItem(USER_TYPE_KEY);
  },

  setUserType: (type: string): void => {
    const encryptedType = encryptStoredData({ type });
    sessionStorage.setItem(USER_TYPE_KEY, JSON.stringify(encryptedType));
  },

  getUserType: (): string | null => {
    try {
      const raw = sessionStorage.getItem(USER_TYPE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed?.encrypted && parsed?.data && parsed?.iv) {
        const decrypted = decryptStoredData(parsed);
        return decrypted?.type || null;
      }
      return typeof parsed === "string" ? parsed : parsed?.type || null;
    } catch {
      return sessionStorage.getItem(USER_TYPE_KEY);
    }
  },

  isAuthenticated: (): boolean => {
    return !!tokenService.getAccessToken();
  },
};
