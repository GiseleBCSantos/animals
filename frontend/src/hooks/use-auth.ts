import { useEffect, useCallback } from "react";
import { authService } from "@/lib/services/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { LoginCredentials, RegisterData } from "@/lib/types";

export function useAuth() {
  const {
    user,
    tokens,
    isAuthenticated,
    isDevMode,
    setUser,
    setTokens,
    setIsAuthenticated,
    setDevMode,
    logout: storeLogout,
  } = useAuthStore();

  const isLoading = !user && !!tokens;

  const fetchUser = useCallback(async () => {
    if (!tokens) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }
    try {
      const userData = await authService.getProfile();

      setUser(userData);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      storeLogout();
    }
  }, [tokens, setUser, setIsAuthenticated, storeLogout]);

  useEffect(() => {
    fetchUser();
  }, [tokens]);

  const login = async (credentials: LoginCredentials) => {
    await authService.login(credentials);
    await fetchUser();
  };

  const register = async (data: RegisterData) => {
    return authService.register(data);
  };

  const logout = () => {
    authService.logout();
    storeLogout();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    isDevMode,
    login,
    register,
    logout,
    refetch: fetchUser,
    setDevMode,
  };
}
