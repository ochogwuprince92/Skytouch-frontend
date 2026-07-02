import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { setUnauthorizedHandler } from '../lib/api';
import {
  clearStoredAuth,
  loadStoredAuth,
  saveStoredAuth,
} from '../lib/authStorage';
import { dashboardPathForRole } from '../lib/roleRoutes';
import * as authService from '../services/authService';
import type { AuthUser, LoginResponse, UserRole } from '../types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  setSession: (response: LoginResponse) => void;
  dashboardPath: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    clearStoredAuth();
    setAccessToken(null);
    setUser(null);
  }, []);

  const setSession = useCallback((response: LoginResponse) => {
    const authUser: AuthUser = {
      userId: response.userId,
      email: response.email,
      role: response.role,
    };
    saveStoredAuth(response.accessToken, authUser);
    setAccessToken(response.accessToken);
    setUser(authUser);
  }, []);

  useEffect(() => {
    const stored = loadStoredAuth();
    if (stored) {
      setAccessToken(stored.token);
      setUser(stored.user);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    return () => setUnauthorizedHandler(null);
  }, [clearSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login(email, password);
      setSession(response);
      return response;
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    try {
      if (accessToken) {
        await authService.logout();
      }
    } catch {
      // Clear local session even if the server call fails.
    } finally {
      clearSession();
    }
  }, [accessToken, clearSession]);

  const dashboardPath = user ? dashboardPathForRole(user.role) : null;

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      logout,
      setSession,
      dashboardPath,
    }),
    [user, accessToken, isLoading, login, logout, setSession, dashboardPath],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useRequiredRole(allowedRoles: UserRole[]): boolean {
  const { user } = useAuth();
  return Boolean(user && allowedRoles.includes(user.role));
}
