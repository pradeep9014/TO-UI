import { isAuthenticated } from './auth-storage';

/**
 * Redirect unauthenticated users to login.
 * Call at the top of protected page entry points.
 */
export function requireAuth(): boolean {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

/**
 * Redirect authenticated users away from auth pages.
 * Call at the top of login/register page entry points.
 */
export function redirectIfAuthenticated(): boolean {
  if (isAuthenticated()) {
    window.location.href = '/index.html';
    return true;
  }
  return false;
}
