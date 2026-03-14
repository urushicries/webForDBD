import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getApprovedPosts } from '../../utils/tournamentStore';
import styles from './Tournaments.module.css';

export default function Tournaments() {
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getApprovedPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className={styles.page}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>{t('tournaments.tag')}</p>
          <h1 className={styles.title}>{t('tournaments.title')}</h1>
          <p className={styles.subtitle}>
            {t('tournaments.subtitle')}
          </p>
          <Link to="/create-tournament" className={styles.postBtn}>
            {t('tournaments.postBtn')}
          </Link>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Feed ───────────────────────────────────────────────────── */}
      <section className={styles.feed} aria-label="Tournament posts">
        <div className={styles.feedInner}>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyHeading}>{t('tournaments.noTournaments')}</p>
              <p className={styles.emptySub}>
                {t('tournaments.beFirst')}{' '}
                <Link to="/create-tournament" className={styles.emptyLink}>
                  {t('tournaments.postTournament')}
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
                        <span className={styles.placeholderText}>{t('tournaments.noImage')}</span>
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
