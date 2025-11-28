import { useAuthStore } from "@/lib/stores/auth-store";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isDevMode, user, tokens } = useAuthStore();
  const isLoading = !user && !!tokens;

  if (isLoading) {
    // Pode exibir um spinner ou null enquanto carrega
    return null;
  }

  if (isAuthenticated || isDevMode) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
