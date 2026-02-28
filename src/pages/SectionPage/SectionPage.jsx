import styles from './SectionPage.module.css';


export default function SectionPage({ title, subtitle, tag = 'Comp DBD', items = [] }) {
  return (
    <div className={styles.page}>
      {/* ── Page Header ──────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>{tag}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Content Cards ────────────────────────────────────────── */}
      {items.length > 0 && (
        <section className={styles.content} aria-label={`${title} content`}>
          <div className={styles.contentInner}>
            <ul className={styles.cardList} role="list">
              {items.map((item, i) => {
                const inner = (
                  <>
                    <span className={styles.cardIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.cardBody}>
                      <h2 className={styles.cardHeadline}>{item.headline}</h2>
                      <p className={styles.cardText}>{item.body}</p>
                    </div>
                    {item.href && (
                      <span className={styles.cardArrow} aria-hidden="true">→</span>
                    )}
                  </>
                );

                return item.href ? (
                  /* Linked card — wraps content in an external <a> */
                  <li key={i} className={styles.cardLi}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.card} ${styles.cardLinked}`}
                    >
                      {inner}
                    </a>
                  </li>
                ) : (
                  /* Static card */
                  <li key={i} className={styles.card}>
                    {inner}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ── Coming Soon Banner ───────────────────────────────────── */}
      <div className={styles.comingSoon}>
        <p className={styles.comingSoonText}>i might add all that in future</p>
      </div>
    </div>
  );
}
