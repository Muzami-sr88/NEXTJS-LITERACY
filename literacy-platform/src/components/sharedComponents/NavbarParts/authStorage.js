export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('lp_token') || '' : '';
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('lp_user') || 'null');
  } catch {
    return null;
  }
}

export function saveAuth(token, user) {
  localStorage.setItem('lp_token', token);
  localStorage.setItem('lp_user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('lp_token');
  localStorage.removeItem('lp_user');
}
