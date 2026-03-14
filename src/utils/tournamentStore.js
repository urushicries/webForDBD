import { getToken } from './authStore.js';

const API = '/api/tournaments';

/** @typedef {{ id: string, title: string, description: string, banner: string | null, status: 'pending' | 'approved' | 'denied', userId: string, createdAt: number }} TournamentPost */

function getHeaders() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Return all posts (any status), sorted newest first. Admin only.
 * @returns {Promise<TournamentPost[]>}
 */
export async function getAllPosts() {
  const res = await fetch(API, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

/**
 * Return only approved posts, sorted newest first.
 * @returns {Promise<TournamentPost[]>}
 */
export async function getApprovedPosts() {
  const res = await fetch(`${API}/approved`);
  if (!res.ok) throw new Error('Failed to fetch approved posts');
  return res.json();
}

/**
 * Submit a new post with status "pending".
 * @param {{ title: string, description: string, banner: string | null }} data
 * @returns {Promise<TournamentPost>}
 */
export async function submitPost(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to submit post');
  }
  return res.json();
}

/**
 * Update a post's status. Admin only.
 * @param {string} id
 * @param {'approved' | 'denied'} status
 * @returns {Promise<void>}
 */
export async function updatePostStatus(id, status) {
  const res = await fetch(`${API}/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update post status');
}

/**
 * Permanently delete a post by id. Admin only.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deletePost(id) {
  const res = await fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete post');
}
