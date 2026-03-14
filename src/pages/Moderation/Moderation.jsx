import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getAllPosts,
  updatePostStatus,
  deletePost,
} from '../../utils/tournamentStore';
import styles from './Moderation.module.css';

const FILTERS = ['all', 'pending', 'approved', 'denied'];

const FILTER_LABELS = {
  all: 'moderation.all',
  pending: 'moderation.pending',
  approved: 'moderation.approved',
  denied: 'moderation.denied',
};

export default function Moderation() {
  const [posts, setPosts]       = useState([]);
  const [filter, setFilter]     = useState('pending');
  const [confirm, setConfirm]   = useState(null); // { id, action: 'approve'|'deny'|'delete' }
  const { t } = useTranslation();

  const STATUS_LABELS = {
    pending:  t('moderation.pending'),
    approved: t('moderation.approved'),
    denied:   t('moderation.denied'),
  };

  const refresh = useCallback(async () => {
    try {
      const all = await getAllPosts();
      setPosts(all); // server returns sorted DESC by createdAt
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleApprove(id) {
    await updatePostStatus(id, 'approved');
    await refresh();
    setConfirm(null);
  }

  async function handleDeny(id) {
    await updatePostStatus(id, 'denied');
    await refresh();
    setConfirm(null);
  }

  async function handleDelete(id) {
    await deletePost(id);
    await refresh();
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
          <p className={styles.tag}>{t('moderation.tag')}</p>
          <h1 className={styles.title}>{t('moderation.title')}</h1>
          <p className={styles.subtitle}>
            {t('moderation.subtitle')}
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
                <span className={styles.filterLabel}>{t(FILTER_LABELS[f])}</span>
                <span className={`${styles.filterBadge} ${styles[`badge_${f}`]}`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Post list */}
          {visible.length === 0 ? (
            <div className={styles.empty}>
              <p>{t('moderation.noPosts')}</p>
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
                      {t('moderation.submitted')}{' '}
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
                        {t('moderation.approve')}
                      </button>
                    )}
                    {post.status !== 'denied' && (
                      <button
                        type="button"
                        className={styles.btnDeny}
                        onClick={() => setConfirm({ id: post.id, action: 'deny' })}
                      >
                        {t('moderation.deny')}
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.btnDelete}
                      onClick={() => setConfirm({ id: post.id, action: 'delete' })}
                    >
                      {t('moderation.delete')}
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
              {confirm.action === 'approve' && t('moderation.approvePost')}
              {confirm.action === 'deny'    && t('moderation.denyPost')}
              {confirm.action === 'delete'  && t('moderation.deletePost')}
            </h3>
            <p className={styles.dialogBody}>
              {confirm.action === 'approve' && t('moderation.approveDesc')}
              {confirm.action === 'deny'    && t('moderation.denyDesc')}
              {confirm.action === 'delete'  && t('moderation.deleteDesc')}
            </p>
            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => setConfirm(null)}
              >
                {t('moderation.cancel')}
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
                {confirm.action === 'approve' && t('moderation.yesApprove')}
                {confirm.action === 'deny'    && t('moderation.yesDeny')}
                {confirm.action === 'delete'  && t('moderation.yesDelete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
