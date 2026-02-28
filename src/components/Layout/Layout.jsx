import TopBar from '../TopBar/TopBar';
import styles from './Layout.module.css';

/**
 * Global layout wrapper — renders the persistent TopBar and
 * offsets child content below the fixed header.
 */
export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <TopBar />
      <main className={styles.main} id="main-content">
        {children}
      </main>
    </div>
  );
}
