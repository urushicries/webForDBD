import { useState, useEffect, useCallback } from 'react';
import {
  getAllPosts,
  updatePostStatus,
  deletePost,
} from '../../utils/tournamentStore';
import styles from './Moderation.module.css';

const STATUS_LABELS = {
  pending:  'Pending',
  approved: 'Approved',
  denied:   'Denied',
};

const FILTERS = ['all', 'pending', 'approved', 'denied'];

export default function Moderation() {
  const [posts, setPosts]       = useState([]);
  const [filter, setFilter]     = useState('pending');
  const [confirm, setConfirm]   = useState(null); // { id, action: 'approve'|'deny'|'delete' }

  const refresh = useCallback(() => {
    const all = getAllPosts().sort((a, b) => b.createdAt - a.createdAt);
    setPosts(all);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function handleApprove(id) {
    updatePostStatus(id, 'approved');
    refresh();
    setConfirm(null);
  }

  function handleDeny(id) {
    updatePostStatus(id, 'denied');
    refresh();
    setConfirm(null);
  }

  function handleDelete(id) {
    deletePost(id);
    refresh();
    setConfirm(null);
  }

  const visible = filter === 'all'
    ? posts
    : posts.filter((p) => p.status === filter);

  const counts = {
    all:      posts.length,
    pending:  posts.filter((p) => p.status === 'pending').length,
    approved: posts.filter((p) => p.status === 'approved').length,
    denied:   posts.filter((p) => p.status === 'denied').length,
  };

  return (
    <div className={styles.page}>
      {/* ── Header ────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>Admin</p>
          <h1 className={styles.title}>Moderation</h1>
          <p className={styles.subtitle}>
            Review tournament posts submitted by the community. Approve to publish,
            deny to reject, or delete permanently.
          </p>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Content ───────────────────────────────────────────────── */}
      <main className={styles.content}>
        <div className={styles.contentInner}>

          {/* Stats bar */}
          <div className={styles.statsBar}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(f)}
              >
                <span className={styles.filterLabel}>{f === 'all' ? 'All' : STATUS_LABELS[f]}</span>
                <span className={`${styles.filterBadge} ${styles[`badge_${f}`]}`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Post list */}
          {visible.length === 0 ? (
            <div className={styles.empty}>
              <p>No {filter === 'all' ? '' : filter} posts.</p>
            </div>
          ) : (
            <ul className={styles.postList} role="list">
              {visible.map((post) => (
                <li key={post.id} className={styles.postCard}>
                  {/* Banner thumbnail */}
                  <div className={styles.thumb}>
                    {post.banner ? (
                      <img src={post.banner} alt="" className={styles.thumbImg} />
                    ) : (
                      <div className={styles.thumbPlaceholder} aria-hidden="true" />
                    )}
                  </div>

                  {/* Meta */}
                  <div className={styles.meta}>
                    <div className={styles.metaTop}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <span className={`${styles.statusBadge} ${styles[`status_${post.status}`]}`}>
                        {STATUS_LABELS[post.status]}
                      </span>
                    </div>
                    <p className={styles.postDesc}>{post.description}</p>
                    <p className={styles.postDate}>
                      Submitted{' '}
                      {new Date(post.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={styles.actions}>
                    {post.status !== 'approved' && (
                      <button
                        type="button"
                        className={styles.btnApprove}
                        onClick={() => setConfirm({ id: post.id, action: 'approve' })}
                      >
                        Approve
                      </button>
                    )}
                    {post.status !== 'denied' && (
                      <button
                        type="button"
                        className={styles.btnDeny}
                        onClick={() => setConfirm({ id: post.id, action: 'deny' })}
                      >
                        Deny
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.btnDelete}
                      onClick={() => setConfirm({ id: post.id, action: 'delete' })}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* ── Confirm Dialog ──────────────────────────────────────── */}
      {confirm && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-heading"
          onClick={(e) => { if (e.target === e.currentTarget) setConfirm(null); }}
        >
          <div className={styles.dialog}>
            <h3 id="confirm-heading" className={styles.dialogTitle}>
              {confirm.action === 'approve' && 'Approve Post?'}
              {confirm.action === 'deny'    && 'Deny Post?'}
              {confirm.action === 'delete'  && 'Delete Post?'}
            </h3>
            <p className={styles.dialogBody}>
              {confirm.action === 'approve' && 'This post will be published on the Tournaments page.'}
              {confirm.action === 'deny'    && 'This post will be rejected and hidden from the public feed.'}
              {confirm.action === 'delete'  && 'This post will be permanently removed and cannot be recovered.'}
            </p>
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => setConfirm(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={
                  confirm.action === 'approve'
                    ? styles.btnApprove
                    : confirm.action === 'deny'
                    ? styles.btnDeny
                    : styles.btnDelete
                }
                onClick={() => {
                  if (confirm.action === 'approve') handleApprove(confirm.id);
                  if (confirm.action === 'deny')    handleDeny(confirm.id);
                  if (confirm.action === 'delete')  handleDelete(confirm.id);
                }}
              >
                {confirm.action === 'approve' && 'Yes, Approve'}
                {confirm.action === 'deny'    && 'Yes, Deny'}
                {confirm.action === 'delete'  && 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
