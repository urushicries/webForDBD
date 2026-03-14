const API = '/api/auth';

/**
 * Sign up a new user
 * @param {{ username: string, email: string, password: string, confirmPassword: string }} data
 * @returns {Promise<{ ok: boolean, token: string, user: { id: string, username: string, email: string, role: string } }>}
 */
export async function signup(data) {
  const res = await fetch(`${API}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Signup failed');
  }
  const result = await res.json();
  if (result.token) {
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
  }
  return result;
}

/**
 * Log in a user
 * @param {{ username: string, password: string }} data
 * @returns {Promise<{ ok: boolean, token: string, user: { id: string, username: string, email: string, role: string } }>}
 */
export async function login(data) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }
  const result = await res.json();
  if (result.token) {
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
  }
  return result;
}

/**
 * Log out the current user
 */
export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

/**
 * Get current user info
 * @returns {{ id: string, username: string, email: string, role: string } | null}
 */
export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

/**
 * Get current auth token
 * @returns {string | null}
 */
export function getToken() {
  return localStorage.getItem('authToken');
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Check if current user is admin
 * @returns {boolean}
 */
export function isAdmin() {
  const user = getCurrentUser();
  return user?.role === 'admin';
}
