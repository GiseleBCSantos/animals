import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthTokens } from "@/lib/types";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isDevMode: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setDevMode: (isDevMode: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isDevMode: false, // Enable dev mode by default to bypass auth
      setUser: (user) => set({ user }),
      setTokens: (tokens) => set({ tokens }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setDevMode: (isDevMode) => set({ isDevMode }),
      logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
