const STORAGE_KEY = 'comp_dbd_tournaments';

/** @typedef {{ id: string, title: string, description: string, banner: string | null, status: 'pending' | 'approved' | 'denied', createdAt: number }} TournamentPost */

/**
 * Return all stored posts (any status).
 * @returns {TournamentPost[]}
 */
export function getAllPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Return only approved posts, sorted newest first.
 * @returns {TournamentPost[]}
 */
export function getApprovedPosts() {
  return getAllPosts()
    .filter((p) => p.status === 'approved')
    .sort((a, b) => b.createdAt - a.createdAt);
}

/**
 * Return pending posts, sorted oldest first (first-in-first-out review).
 * @returns {TournamentPost[]}
 */
export function getPendingPosts() {
  return getAllPosts()
    .filter((p) => p.status === 'pending')
    .sort((a, b) => a.createdAt - b.createdAt);
}

/**
 * Save a new post with status "pending".
 * @param {{ title: string, description: string, banner: string | null }} data
 * @returns {TournamentPost}
 */
export function submitPost(data) {
  const post = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description.trim(),
    banner: data.banner ?? null,
    status: 'pending',
    createdAt: Date.now(),
  };
  const all = getAllPosts();
  all.push(post);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return post;
}

/**
 * Update a post's status.
 * @param {string} id
 * @param {'approved' | 'denied'} status
 */
export function updatePostStatus(id, status) {
  const all = getAllPosts().map((p) => (p.id === id ? { ...p, status } : p));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * Permanently delete a post by id.
 * @param {string} id
 */
export function deletePost(id) {
  const all = getAllPosts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
