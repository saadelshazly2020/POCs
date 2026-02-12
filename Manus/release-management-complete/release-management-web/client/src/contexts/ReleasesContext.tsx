import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Release, mockReleases, mockProjects, mockTeams, mockStatuses } from "@/lib/mockData";
import { releaseApi } from "@/lib/api";
import { toast } from "sonner";

interface ReleasesContextType {
  releases: Release[];
  isLoading: boolean;
  error: string | null;
  addRelease: (release: Omit<Release, 'id' | 'createdDate' | 'modifiedDate' | 'createdBy' | 'createdByUsername' | 'modifiedBy' | 'modifiedByUsername'>) => Promise<void>;
  updateRelease: (id: number, release: Partial<Release>) => Promise<void>;
  deleteRelease: (id: number) => Promise<void>;
  getReleaseById: (id: number) => Release | undefined;
  refreshReleases: () => Promise<void>;
}

const ReleasesContext = createContext<ReleasesContextType | undefined>(undefined);

export function ReleasesProvider({ children }: { children: React.ReactNode }) {
  const [releases, setReleases] = useState<Release[]>(mockReleases);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useApi, setUseApi] = useState(false);

  // Try to load from API on mount
  useEffect(() => {
    const loadReleases = async () => {
      try {
        setIsLoading(true);
        const data = await releaseApi.getAll();
        setReleases(data);
        setUseApi(true);
        setError(null);
      } catch (err) {
        // Fall back to mock data if API fails
        console.warn("API not available, using mock data:", err);
        setReleases(mockReleases);
        setUseApi(false);
        setError(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadReleases();
  }, []);

  const refreshReleases = useCallback(async () => {
    if (!useApi) return;
    
    try {
      setIsLoading(true);
      const data = await releaseApi.getAll();
      setReleases(data);
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to refresh releases";
      setError(errorMsg);
      console.error("Failed to refresh releases:", err);
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  const addRelease = useCallback(async (releaseData: Omit<Release, 'id' | 'createdDate' | 'modifiedDate' | 'createdBy' | 'createdByUsername' | 'modifiedBy' | 'modifiedByUsername'>) => {
    try {
      setIsLoading(true);
      
      if (useApi) {
        // Use API
        const newRelease = await releaseApi.create(releaseData);
        setReleases(prev => [newRelease, ...prev]);
      } else {
        // Use mock data
        const newRelease: Release = {
          ...releaseData,
          id: Math.max(...releases.map(r => r.id), 0) + 1,
          createdDate: new Date().toISOString(),
          modifiedDate: new Date().toISOString(),
          createdBy: 1,
          createdByUsername: "admin",
          modifiedBy: 1,
          modifiedByUsername: "admin",
        };
        setReleases(prev => [newRelease, ...prev]);
      }
      
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create release";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [releases, useApi]);

  const updateRelease = useCallback(async (id: number, releaseData: Partial<Release>) => {
    try {
      setIsLoading(true);
      
      if (useApi) {
        // Use API
        await releaseApi.update(id, releaseData);
        await refreshReleases();
      } else {
        // Use mock data
        setReleases(prev =>
          prev.map(release =>
            release.id === id
              ? {
                  ...release,
                  ...releaseData,
                  modifiedDate: new Date().toISOString(),
                  modifiedBy: 1,
                  modifiedByUsername: "admin",
                }
              : release
          )
        );
      }
      
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update release";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [useApi, refreshReleases]);

  const deleteRelease = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      
      if (useApi) {
        // Use API
        await releaseApi.delete(id);
        setReleases(prev => prev.filter(release => release.id !== id));
      } else {
        // Use mock data
        setReleases(prev => prev.filter(release => release.id !== id));
      }
      
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete release";
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [useApi]);

  const getReleaseById = useCallback((id: number) => {
    return releases.find(release => release.id === id);
  }, [releases]);

  return (
    <ReleasesContext.Provider value={{ releases, isLoading, error, addRelease, updateRelease, deleteRelease, getReleaseById, refreshReleases }}>
      {children}
    </ReleasesContext.Provider>
  );
}

export function useReleases() {
  const context = useContext(ReleasesContext);
  if (!context) {
    throw new Error("useReleases must be used within a ReleasesProvider");
  }
  return context;
}
