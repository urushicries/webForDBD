import { Link } from 'react-router-dom';
import AnimatedText from '../../components/AnimatedText/AnimatedText';
import styles from './MainPage.module.css';

const HIGHLIGHTS = [
  {
    label: 'Big Leagues',
    desc: 'Biggest leagues, tournaments there are in the competitive DBD scene.',
    path: '/big-leagues',
  },
  {
    label: 'Build Crafting',
    desc: 'Make and share killer/survivor builds with automatic check for mistakes according to competitive rulesets.',
    path: 'https://balancedbydaylight.com',
    external: true,
  },
  {
    label: 'Ranked',
    desc: 'Track your MMR, match history, and climb the solo/team queue ladder.',
    path: '/dbd-ranked',
  },
  {
    label: '1v1 Ladder',
    desc: 'One killer, one survivor. Climb the purest format in comp DBD.',
    path: '/1v1-ladder',
  },
  {
    label: 'Scrims',
    desc: 'Organize practice sessions against other competitive teams.',
    path: '/dbd-scrims',
  },
  {
    label: 'Major Teams',
    desc: 'Meet the organisations and rosters competing at the top of the comp DBD scene.',
    path: '/major-teams',
  },
];

const COMING_SOON = [
  {
    label: 'Team Finder',
    desc: 'Match with players who share your role, skill band, and schedule.',
  },
  {
    label: 'Stats Central',
    desc: 'Aggregated performance data across killers, maps, and competitive formats.',
  },
];

export default function MainPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden="true" />

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Dead by Daylight · Competitive Hub</p>

          <h1 id="hero-heading" className={styles.heroHeading}>
            <AnimatedText text="COMP DBD PLACE"/>
          </h1>
            <p className={styles.heroSub}>
            Everything you need to know to start your way in competitive Dead by Daylight.
          </p>

          <div className={styles.heroCta}>
            <Link to="/big-leagues" className={styles.ctaPrimary}>
              View Tournaments
            </Link>
            <Link to="/dbd-scrims" className={styles.ctaSecondary}>
              Find Scrims
            </Link>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className={styles.divider} aria-hidden="true" />

      {/* ── Quick-access grid ────────────────────────────────────────── */}
      <section className={styles.grid} aria-label="Site sections">
        <div className={styles.gridInner}>
          <h2 className={styles.gridTitle}>What's inside</h2>
          <ul className={styles.cards} role="list">
            {HIGHLIGHTS.map(({ label, desc, path, external }) => (
              <li key={path}>
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                  >
                    <span className={styles.cardLabel}>{label}</span>
                    <span className={styles.cardDesc}>{desc}</span>
                    <span className={styles.cardArrow} aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link to={path} className={styles.card}>
                    <span className={styles.cardLabel}>{label}</span>
                    <span className={styles.cardDesc}>{desc}</span>
                    <span className={styles.cardArrow} aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}

            {/* Coming-soon placeholder cards */}
            {COMING_SOON.map(({ label, desc }) => (
              <li key={label} aria-label={`${label} — coming soon`}>
                <div className={styles.cardSoon}>
                  <span className={styles.cardSoonBadge}>Soon, maybe</span>
                  <span className={styles.cardLabel}>{label}</span>
                  <span className={styles.cardDesc}>{desc}</span>
                </div>
              </li>
            ))}

          </ul>

          <p className={styles.moreSoon}>more coming soon, maybe</p>
        </div>
      </section>
    </div>
  );
}