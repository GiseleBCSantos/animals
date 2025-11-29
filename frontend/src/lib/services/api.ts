/// <reference types="vite/client" />
import { storage } from "@/lib/utils/storage";

const API_BASE_URL =
  import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  requireAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { requireAuth = true, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    if (requireAuth) {
      const token = storage.getAccessToken();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(fetchOptions.body instanceof FormData)) {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    let body: BodyInit | undefined;
    if (fetchOptions.body instanceof FormData) {
      body = fetchOptions.body;
    } else if (fetchOptions.body !== undefined) {
      body = JSON.stringify(fetchOptions.body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
      body,
    });

    if (response.status === 401 && requireAuth) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        const newToken = storage.getAccessToken();
        headers["Authorization"] = `Bearer ${newToken}`;
        const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
          ...fetchOptions,
          headers,
          body,
        });
        if (!retryResponse.ok) {
          throw await this.handleError(retryResponse);
        }
        return retryResponse.json();
      } else {
        storage.clearTokens();
        window.location.href = "/login";
        throw new Error("Sessão expirada");
      }
    }

    if (!response.ok) {
      throw await this.handleError(response);
    }

    if (response.status === 204) return {} as T;

    return response.json();
  }

  private async handleError(response: Response) {
    const data = await response.json().catch(() => ({}));
    return {
      status: response.status,
      message:
        (data as any).detail || (data as any).message || "Erro desconhecido",
      details: data,
    };
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/api/auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        storage.setTokens(data.access, refreshToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data as BodyInit,
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data as BodyInit,
    });
  }

  patch<T>(endpoint: string, data?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: data as BodyInit,
    });
  }

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);
