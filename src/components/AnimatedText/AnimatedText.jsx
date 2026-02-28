import { useMemo } from 'react';
import styles from './AnimatedText.module.css';

const SESSION_KEY = 'compDBD_heroAnimated';

/**
 * Renders text word-by-word with a staggered fade + upward entrance.
 * The animation runs only once per browser session (tracked via sessionStorage).
 *
 * Props:
 *   text     – the string to animate
 *   className – optional extra class for the wrapper
 */
export default function AnimatedText({ text, className = '' }) {
  const words = useMemo(() => text.split(' '), [text]);

  // Check if animation has already played this session
  const alreadyPlayed = typeof window !== 'undefined'
    ? sessionStorage.getItem(SESSION_KEY) === 'true'
    : false;

  // Mark as played immediately so subsequent renders are static
  if (!alreadyPlayed && typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }

  return (
    <span className={`${styles.wrapper} ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className={styles.wordOuter}
          aria-hidden="true"
        >
          <span
            className={`${styles.word} ${alreadyPlayed ? styles.visible : styles.animate}`}
            style={
              alreadyPlayed
                ? undefined
                /* Stagger: spread 6 words across ~900ms, each reveals in 400ms */
                : { animationDelay: `${i * 160}ms` }
            }
          >
            {word}
          </span>
          {/* Non-breaking space between words except after the last */}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
