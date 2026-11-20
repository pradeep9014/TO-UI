const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export function getToken(): string | null {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string): void {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export interface StoredUser {
  username: string;
  name: string;
}

export function getStoredUser(): StoredUser | null {
  const raw = sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser): void {
  sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
}
