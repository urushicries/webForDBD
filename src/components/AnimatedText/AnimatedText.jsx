import { useState, useEffect, useRef } from 'react';
import styles from './AnimatedText.module.css';

const TYPE_SPEED    = 150;  // ms per character while typing
const DELETE_SPEED  = 100;   // ms per character while deleting
const PAUSE_TYPED   = 2500; // ms to show full word before deleting
const PAUSE_DELETED = 600;  // ms to wait after full delete before typing next

// Default cycling words (used when no `words` prop is provided)
const DEFAULT_WORDS = ['PLACE', 'HOME', 'HUB', 'ARENA', 'BASE','SPOT'];

/**
 * Typewriter animation component.
 *
 * – Types `text` character-by-character on first mount.
 * – Then repeatedly deletes the last word and re-types a randomly
 *   picked word from the `words` array.
 * – A blinking cursor is always visible at the end of the text.
 *
 * Props:
 *   text      – full string to start with, e.g. "COMP DBD PLACE"
 *   words     – array of words to cycle through for the last position
 *   className – optional extra wrapper class
 */
export default function AnimatedText({ text, words = DEFAULT_WORDS, className = '' }) {
  // Stable derivations (props won't change for the lifetime of this instance)
  const staticRef   = useRef((() => {
    const parts = text.trim().split(/\s+/);
    return parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
  })());
  const initWordRef = useRef(text.trim().split(/\s+/).at(-1));

  const wordListRef = useRef((() => {
    const init = initWordRef.current;
    const base = words.length > 0 ? words : DEFAULT_WORDS;
    return base.includes(init) ? base : [init, ...base];
  })());

  const [phase, setPhase]       = useState('intro');  // 'intro' | 'deleting' | 'typing'
  const [introIdx, setIntroIdx] = useState(0);         // chars revealed during intro
  const [wordIdx, setWordIdx]   = useState(0);         // index into wordListRef
  const [charIdx, setCharIdx]   = useState(0);         // chars of current cycling word shown
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    const fullText = text.trim();
    const list     = wordListRef.current;
    const curWord  = list[wordIdx];

    if (phase === 'intro') {
      if (introIdx < fullText.length) {
        timerRef.current = setTimeout(() => setIntroIdx(n => n + 1), TYPE_SPEED);
      } else {
        // Intro done – pause then start cycling
        timerRef.current = setTimeout(() => {
          setCharIdx(initWordRef.current.length);
          setPhase('deleting');
        }, PAUSE_TYPED);
      }

    } else if (phase === 'deleting') {
      if (charIdx > 0) {
        timerRef.current = setTimeout(() => setCharIdx(n => n - 1), DELETE_SPEED);
      } else {
        // Fully deleted – pick a random different word and start typing
        timerRef.current = setTimeout(() => {
          const len = list.length;
          let next  = wordIdx;
          if (len > 1) {
            do { next = Math.floor(Math.random() * len); }
            while (next === wordIdx);
          }
          setWordIdx(next);
          setPhase('typing');
        }, PAUSE_DELETED);
      }

    } else if (phase === 'typing') {
      if (charIdx < curWord.length) {
        timerRef.current = setTimeout(() => setCharIdx(n => n + 1), TYPE_SPEED);
      } else {
        // Word fully typed – pause then delete
        timerRef.current = setTimeout(() => setPhase('deleting'), PAUSE_TYPED);
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [phase, introIdx, charIdx, wordIdx, text]);

  // Build the visible string
  const rendered = (() => {
    if (phase === 'intro') return text.trim().slice(0, introIdx);
    const dyn  = wordListRef.current[wordIdx].slice(0, charIdx);
    const stat = staticRef.current;
    return stat ? `${stat}\u00A0${dyn}` : dyn;
  })();

  return (
    <span className={`${styles.wrapper} ${className}`} aria-label={text}>
      {rendered}
      <span className={styles.cursor} aria-hidden="true" />
    </span>
  );
}
