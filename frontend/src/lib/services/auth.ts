import { api } from "./api";
import { useAuthStore } from "@/lib/stores/auth-store";
import type {
  User,
  AuthTokens,
  LoginCredentials,
  RegisterData,
} from "@/lib/types";
import { storage } from "../utils";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const tokens = await api.post<AuthTokens>("/api/auth/login/", credentials, {
      requireAuth: false,
    });

    const store = useAuthStore.getState();
    store.setTokens(tokens);
    store.setIsAuthenticated(true);

    storage.setTokens(tokens.access, tokens.refresh);

    return tokens;
  },

  async register(data: RegisterData): Promise<User> {
    return api.post<User>("/api/auth/register/", data, { requireAuth: false });
  },

  async getProfile(): Promise<User> {
    return api.get<User>("/api/auth/me/");
  },

  async generateThoughts(): Promise<{ message: string; details: unknown[] }> {
    return api.post("/api/auth/generate-thoughts/");
  },

  logout(): void {
    storage.clearTokens();
    useAuthStore.getState().logout();
  },

  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated;
  },
};
