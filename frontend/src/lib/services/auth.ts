import { api } from "./api"
import { storage } from "@/lib/utils/storage"
import type { User, AuthTokens, LoginCredentials, RegisterData } from "@/lib/types"

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const tokens = await api.post<AuthTokens>("/api/auth/login/", credentials, { requireAuth: false })
    storage.setTokens(tokens.access, tokens.refresh)
    return tokens
  },

  async register(data: RegisterData): Promise<User> {
    return api.post<User>("/api/auth/register/", data, { requireAuth: false })
  },

  async getProfile(): Promise<User> {
    return api.get<User>("/api/auth/me/")
  },

  async generateThoughts(): Promise<{ message: string; details: unknown[] }> {
    return api.post("/api/auth/generate-thoughts/")
  },

  logout(): void {
    storage.clearTokens()
    window.location.href = "/login"
  },

  isAuthenticated(): boolean {
    return storage.isAuthenticated()
  },
}
