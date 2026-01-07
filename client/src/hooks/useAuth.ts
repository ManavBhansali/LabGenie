import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["auth-user"],
    retry: false,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/auth/user`, {
        credentials: "include",
      });

      if (res.status === 401) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res.json();
    },
  });

  // Debug logs
  console.log("🔧 [useAuth] Hook state:", {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  });

  return {
    user: user || undefined,
    isLoading,
    isAuthenticated: !!user,
  };
}
