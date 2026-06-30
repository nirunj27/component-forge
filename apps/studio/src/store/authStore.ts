import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "developer" | "viewer";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
  isDeveloper: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isDeveloper: () => {
        const role = get().user?.role;
        return role === "developer" || role === "admin";
      },
      isAdmin: () => get().user?.role === "admin",
    }),
    { name: "forge-studio-auth" },
  ),
);
