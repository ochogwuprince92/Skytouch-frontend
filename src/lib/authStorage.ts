import type { AuthUser } from '../types/auth';

const TOKEN_KEY = 'skytouch_access_token';
const USER_KEY = 'skytouch_user';

export function loadStoredAuth(): {
  token: string;
  user: AuthUser;
} | null {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const rawUser = sessionStorage.getItem(USER_KEY);
  if (!token || !rawUser) return null;

  try {
    return { token, user: JSON.parse(rawUser) as AuthUser };
  } catch {
    clearStoredAuth();
    return null;
  }
}

export function saveStoredAuth(token: string, user: AuthUser): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}
