import { useState, useEffect, useCallback } from "react";
import { authService } from "@/lib/services/auth";
import { storage } from "@/lib/utils/storage";
import type { User, LoginCredentials, RegisterData } from "@/lib/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = useCallback(async () => {
    if (!storage.isAuthenticated()) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authService.getProfile();
      setUser(userData);
      setIsAuthenticated(true);
    } catch {
      storage.clearTokens();
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials: LoginCredentials) => {
    await authService.login(credentials);
    await fetchUser();
  };

  const register = async (data: RegisterData) => {
    return authService.register(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refetch: fetchUser,
  };
}
