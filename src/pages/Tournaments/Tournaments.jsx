import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApprovedPosts } from '../../utils/tournamentStore';
import styles from './Tournaments.module.css';

export default function Tournaments() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getApprovedPosts());
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>Competitive DBD</p>
          <h1 className={styles.title}>Tournaments</h1>
          <p className={styles.subtitle}>
            Community-posted tournament announcements, open brackets, and organised events.
          </p>
          <Link to="/create-tournament" className={styles.postBtn}>
            + Post a Tournament
          </Link>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Feed ───────────────────────────────────────────────────── */}
      <section className={styles.feed} aria-label="Tournament posts">
        <div className={styles.feedInner}>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyHeading}>No tournaments posted yet.</p>
              <p className={styles.emptySub}>
                Be the first —{' '}
                <Link to="/create-tournament" className={styles.emptyLink}>
                  post a tournament
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className={styles.postList} role="list">
              {posts.map((post) => (
                <li key={post.id} className={styles.postCard}>
                  {/* Banner */}
                  <div className={styles.bannerWrap}>
                    {post.banner ? (
                      <img
                        src={post.banner}
                        alt={`${post.title} banner`}
                        className={styles.bannerImg}
                      />
                    ) : (
                      <div className={styles.bannerPlaceholder} aria-hidden="true">
                        <span className={styles.placeholderText}>No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardDesc}>{post.description}</p>
                    <p className={styles.cardDate}>
                      {new Date(post.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
