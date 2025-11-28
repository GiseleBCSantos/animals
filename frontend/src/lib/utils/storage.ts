const ACCESS_TOKEN_KEY = "petcare_access_token"
const REFRESH_TOKEN_KEY = "petcare_refresh_token"

export const storage = {
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  },

  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setTokens: (access: string, refresh: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  },

  clearTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },

  isAuthenticated: (): boolean => {
    return !!storage.getAccessToken()
  },
}
