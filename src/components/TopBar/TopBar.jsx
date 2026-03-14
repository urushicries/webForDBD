import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isAuthenticated, getCurrentUser, logout } from '../../utils/authStore';
import styles from './TopBar.module.css';

const NAV_LINKS = [
  { labelKey: 'nav.main',             path: '/' },
  { labelKey: 'nav.bigLeagues',      path: '/big-leagues' },
  { labelKey: 'nav.makeYourBuilds', path: 'https://balancedbydaylight.com', external: true },
  { labelKey: 'nav.dbdScrims',       path: '/dbd-scrims' },
  { labelKey: 'nav.dbdRanked',       path: '/dbd-ranked' },
  { labelKey: 'nav.1v1Ladder',       path: '/1v1-ladder' },
  { labelKey: 'nav.majorTeams',      path: '/major-teams' },
  { labelKey: 'nav.tutorials',        path: '/tutorials' },
  { labelKey: 'nav.tournaments',      path: '/tournaments' },
  { labelKey: 'nav.moderation',       path: '/moderation', adminOnly: true },
];

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Update auth state on location change
  useEffect(() => {
    setIsAuth(isAuthenticated());
    setUser(getCurrentUser());
  }, [location]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    setMenuOpen(false);
    navigate('/');
  };

  // Filter nav links based on auth status
  const getVisibleLinks = () => {
    return NAV_LINKS.filter(link => {
      if (link.adminOnly) {
        return isAuth && user?.role === 'admin';
      }
      return true;
    });
  };

  const visibleLinks = getVisibleLinks();

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
            {visibleLinks.map(({ labelKey, path, external }) => (
              <li key={path}>
                {external ? (
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {t(labelKey)}
                  </a>
                ) : (
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ''}`
                    }
                  >
                    {t(labelKey)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Language toggle + Auth + Hamburger */}
        <div className={styles.rightControls}>
          {isAuth && user && (
            <div className={styles.userInfo}>
              <span className={styles.username}>{user.username}</span>
              {user.role === 'admin' && <span className={styles.adminBadge}>ADMIN</span>}
            </div>
          )}

          {isAuth ? (
            <button
              className={styles.authBtn}
              onClick={handleLogout}
              title={t('auth.logout')}
            >
              {t('auth.logout')}
            </button>
          ) : (
            <NavLink
              to="/auth"
              className={styles.authBtn}
              title={t('auth.login')}
            >
              {t('auth.login')}
            </NavLink>
          )}

          <button
            className={styles.langBtn}
            onClick={toggleLanguage}
            aria-label={`Switch to ${i18n.language === 'en' ? 'Russian' : 'English'}`}
            title={t('common.language')}
          >
            {i18n.language === 'en' ? 'РУ' : 'EN'}
          </button>

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
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className={styles.mobileList} role="list">
          {visibleLinks.map(({ labelKey, path, external }) => (
            <li key={path}>
              {external ? (
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileLink}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {t(labelKey)}
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
                  {t(labelKey)}
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
