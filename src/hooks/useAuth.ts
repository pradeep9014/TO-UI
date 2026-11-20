import { useState, useCallback, useEffect } from 'react';
import {
  getToken,
  setToken,
  clearAuth,
  getStoredUser,
  setStoredUser,
  type StoredUser,
} from '../utils/auth-storage';
import { authService } from '../services/auth.service';
import type { LoginDto, RegisterDto } from '../types/auth.types';
import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState<StoredUser | null>(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const isLoggedIn = !!token;

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const login = useCallback(async (dto: LoginDto) => {
    setIsLoading(true);
    try {
      const res = await authService.signin(dto);
      setToken(res.data.accessToken);
      // Backend doesn't return user info, so we store the username from the form
      const storedUser: StoredUser = { username: dto.username, name: dto.username };
      setStoredUser(storedUser);
      setUser(storedUser);
      toast.success('Signed in successfully!');
      window.location.href = '/index.html';
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Invalid credentials');
      toast.error(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (dto: RegisterDto) => {
    setIsLoading(true);
    try {
      await authService.signup(dto);
      toast.success('Account created! Please sign in.');
      window.location.href = '/login.html';
    } catch (err: unknown) {
      const msg = extractErrorMessage(err, 'Registration failed');
      toast.error(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    window.location.href = '/login.html';
  }, []);

  return { user, isLoggedIn, isLoading, login, register, logout };
}

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const resp = (err as { response?: { data?: { message?: string | string[] } } }).response;
    const msg = resp?.data?.message;
    if (Array.isArray(msg)) return msg[0];
    if (typeof msg === 'string') return msg;
  }
  return fallback;
}
