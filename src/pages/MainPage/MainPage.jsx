import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import styles from './MainPage.module.css';

export default function MainPage() {
  const { t } = useTranslation();
  const highlights = t('mainPage.highlights', { returnObjects: true });
  const coming = t('mainPage.coming', { returnObjects: true });
  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{t('mainPage.eyebrow')}</p>

          <h1 id="hero-heading" className={styles.heroHeading}>
            <AnimatedText text={t('mainPage.heading')}/>
          </h1>
            <p className={styles.heroSub}>
            {t('mainPage.subtitle')}
          </p>

          <div className={styles.heroCta}>
            <Link to="/big-leagues" className={styles.ctaPrimary}>
              {t('mainPage.viewTournaments')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className={styles.divider} aria-hidden="true" />

      {/* ── Quick-access grid ────────────────────────────────────────── */}
      <section className={styles.grid} aria-label="Site sections">
        <div className={styles.gridInner}>
          <h2 className={styles.gridTitle}>{t('mainPage.whatsInside')}</h2>
          <ul className={styles.cards} role="list">
            {highlights.map(({ label, desc, path, external }, idx) => {
              const defaultPaths = ['/big-leagues', 'https://balancedbydaylight.com', '/dbd-ranked', '/1v1-ladder', '/dbd-scrims', '/major-teams'];
              const p = path || defaultPaths[idx];
              const isExt = external || idx === 1;
              return (
                <li key={p}>
                  {isExt ? (
                    <a
                      href={p}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.card}
                    >
                      <span className={styles.cardLabel}>{label}</span>
                      <span className={styles.cardDesc}>{desc}</span>
                      <span className={styles.cardArrow} aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <Link to={p} className={styles.card}>
                      <span className={styles.cardLabel}>{label}</span>
                      <span className={styles.cardDesc}>{desc}</span>
                      <span className={styles.cardArrow} aria-hidden="true">→</span>
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Coming-soon placeholder cards */}
            {coming.map(({ label, desc }) => (
              <li key={label} aria-label={`${label} — coming soon`}>
                <div className={styles.cardSoon}>
                  <span className={styles.cardSoonBadge}>{t('mainPage.soon')}</span>
                  <span className={styles.cardLabel}>{label}</span>
                  <span className={styles.cardDesc}>{desc}</span>
                </div>
              </li>
            ))}

          </ul>

          <p className={styles.moreSoon}>{t('mainPage.moreSoon')}</p>
        </div>
      </section>
    </div>
  );
}