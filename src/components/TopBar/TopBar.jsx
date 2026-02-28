import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './TopBar.module.css';

const NAV_LINKS = [
  { label: 'Main',             path: '/' },
  { label: 'Big Leagues',      path: '/big-leagues' },
  { label: 'Make Your Builds', path: 'https://balancedbydaylight.com', external: true },
  { label: 'DBD Scrims',       path: '/dbd-scrims' },
  { label: 'DBD Ranked',       path: '/dbd-ranked' },
  { label: '1v1 Ladder',       path: '/1v1-ladder' },
  { label: 'Major Teams',      path: '/major-teams' },
  { label: 'Tutorials',        path: '/tutorials' },
];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.inner}>
        {/* Brand mark */}
        <NavLink to="/" className={styles.brand} aria-label="Comp DBD Home">
          <span className={styles.brandAccent}>COMP</span>DBD
        </NavLink>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map(({ label, path, external }) => (
              <li key={path}>
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {label}
                  </a>
                ) : (
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* Three bars rendered via CSS */}
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileList} role="list">
          {NAV_LINKS.map(({ label, path, external }) => (
            <li key={path}>
              {external ? (
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileLink}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ''}`
                  }
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop dismiss */}
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
