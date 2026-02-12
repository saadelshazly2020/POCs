import { Release } from "./mockData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5159/api";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Helper function to make API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add auth token if available
  const token = localStorage.getItem("authToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: headers as HeadersInit,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

// Release API endpoints
export const releaseApi = {
  getAll: async (): Promise<Release[]> => {
    try {
      return await apiCall<Release[]>("/releases");
    } catch (error) {
      console.error("Failed to fetch releases:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Release> => {
    try {
      return await apiCall<Release>(`/releases/${id}`);
    } catch (error) {
      console.error(`Failed to fetch release ${id}:`, error);
      throw error;
    }
  },

  create: async (release: Omit<Release, "id" | "createdDate" | "modifiedDate" | "createdBy" | "createdByUsername" | "modifiedBy" | "modifiedByUsername">): Promise<Release> => {
    try {
      return await apiCall<Release>("/releases", {
        method: "POST",
        body: JSON.stringify(release),
      });
    } catch (error) {
      console.error("Failed to create release:", error);
      throw error;
    }
  },

  update: async (id: number, release: Partial<Release>): Promise<void> => {
    try {
      await apiCall<void>(`/releases/${id}`, {
        method: "PUT",
        body: JSON.stringify(release),
      });
    } catch (error) {
      console.error(`Failed to update release ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiCall<void>(`/releases/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(`Failed to delete release ${id}:`, error);
      throw error;
    }
  },
};

// Auth API endpoints
export const authApi = {
  login: async (username: string, password: string): Promise<{ token: string; user: any }> => {
    try {
      const response = await apiCall<{ token: string; user: any }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      
      // Store token
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem("authToken");
  },

  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },
};

// Reports API endpoints
export const reportsApi = {
  getReleaseSummary: async (): Promise<any[]> => {
    try {
      return await apiCall<any[]>("/reports/ReleaseSummary");
    } catch (error) {
      console.error("Failed to fetch release summary:", error);
      throw error;
    }
  },

  getTeamPerformance: async (): Promise<any[]> => {
    try {
      return await apiCall<any[]>("/reports/TeamPerformance");
    } catch (error) {
      console.error("Failed to fetch team performance:", error);
      throw error;
    }
  },

  getProjectStatus: async (): Promise<any[]> => {
    try {
      return await apiCall<any[]>("/reports/ProjectStatus");
    } catch (error) {
      console.error("Failed to fetch project status:", error);
      throw error;
    }
  },
};
