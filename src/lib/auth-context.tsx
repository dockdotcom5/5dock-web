'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import { authApi, userApi, setCurrentUserId } from './api';

export interface User {
  id: number;
  username: string;
  display_name: string;
  email: string;
  role: number;
  status: number;
  quota: number;
  used_quota: number;
  request_count: number;
  group: string;
  aff_code: string;
}

interface AuthResult {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthResult>;
  register: (data: {
    username: string;
    password: string;
    email?: string;
    aff_code?: string;
  }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await userApi.getSelf();
      if (res.success && res.data) {
        const userData = res.data as User;
        setUser(userData);
        setCurrentUserId(userData.id);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(
    async (username: string, password: string): Promise<AuthResult> => {
      try {
        const res = await authApi.login(username, password);
        if (res.success && res.data) {
          const loginData = res.data as { id: number };
          setCurrentUserId(loginData.id);
          await refreshUser();
        }
        return { success: res.success, message: res.message };
      } catch {
        return { success: false, message: '网络错误，请稍后重试' };
      }
    },
    [refreshUser]
  );

  const register = useCallback(
    async (data: {
      username: string;
      password: string;
      email?: string;
      aff_code?: string;
    }): Promise<AuthResult> => {
      try {
        const res = await authApi.register(data);
        return { success: res.success, message: res.message };
      } catch {
        return { success: false, message: '网络错误，请稍后重试' };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setCurrentUserId(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
