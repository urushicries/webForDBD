import { useTranslation } from 'react-i18next';
import styles from './MajorTeams.module.css';

import invictusImg  from '../../imgs/invictus.webp';
import elysiumImg   from '../../imgs/elysium.png';
import praxisImg    from '../../imgs/praxis.webp';
import umbrellaImg  from '../../imgs/umbrella.png';
import ascentImg    from '../../imgs/ascent.webp';
import winterImg    from '../../imgs/winter.png';
import blizzardImg  from '../../imgs/blizzard.png';
import sereinImg    from '../../imgs/serein.png';

const TEAMS = [
  {
    name: 'Invictus',
    description:
      "The best team in the world. That's it.\nRoster is\nKnightlight\nPedro\nRocket\nDan\nKekso\nSpitzz",
    banner: invictusImg,
  },
  {
    name: 'Elysium',
    description:
      'This team is the most unconsistent team of all top tier ones, they can either be unstoppable, or just lose to anyone.\nRoster is\nXeno\nPedrohz\nSilhey\nObii\nZynox\nBubbo)',
    banner: elysiumImg,
  },
  {
    name: 'Praxis',
    description:
      'Consistensy is their key to success, they are always a threat to win any tournament they attend.\nRoster is\nZaka\nWard\nV1\n1lmarco\nSt1v1\nOverdose',
    banner: praxisImg,
  },
  {
    name: 'Umbrella',
    description:
      'The best russian team and one of the best in the world. They might have best surv roster in world, but their killer is lacking.\nRoster is\nHxrdwell\nSwatter\nDer1ce\ngrenout\nSasuha\nTheFallenArt\nLemag1c',
    banner: umbrellaImg,
  },
  {
    name: 'Ascent',
    description:
      'Once best NA team there are, but now they are struggling to find their form. They have a very talented roster, but they need to step up their game if they want to compete with the best.\nRoster is\nAngelz\nWispy\nJah\nZafis\nPtrl',
    banner: ascentImg,
  },
  {
    name: 'Winter',
    description:
      "NA Content machine, every time they play it's fire as hell content. IDK if they are top tier or not, but they are definitely the most entertaining team to watch.\nRoster is\nMomo\nJulian\nAcid\nKenshii\nJayden",
    banner: winterImg,
  },
  {
    name: 'Blizzard',
    description:
      "SA team with big potential, but i can't judge fair, i don't like SA teams.\nRoster is\nZube\nweejason\nMost\nFedenit\nPowa\nSoudy\nVaja",
    banner: blizzardImg,
  },
  {
    name: 'Serein',
    description:
      'The new team with players that are looking to make a name for themselves. They have a lot of potential, but they need to work on their teamwork if they want to compete with the best.\nRoster is\nHaZe\nFreeze\nRatz\nMX\nurushi',
    banner: sereinImg,
  },
];

export default function MajorTeams() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.tag}>{t('majorTeams.tag')}</p>
          <h1 className={styles.title}>{t('majorTeams.title')}</h1>
          <p className={styles.subtitle}>
                {t('majorTeams.subtitle')}
          </p>
        </div>
        <div className={styles.headerRule} aria-hidden="true" />
      </header>

      {/* ── Team Cards ────────────────────────────────────────────── */}
      <section className={styles.content} aria-label="Major teams">
        <div className={styles.contentInner}>
          <ul className={styles.teamList} role="list">
            {TEAMS.map((team, i) => (
              <li key={i} className={styles.teamCard}>
                {/* Banner */}
                <div className={styles.teamBanner}>
                  {team.banner ? (
                    <img
                      src={team.banner}
                      alt={`${team.name} banner`}
                      className={styles.bannerImg}
                    />
                  ) : (
                    <div className={styles.bannerPlaceholder} aria-hidden="true">
                      <span className={styles.bannerLabel}>Banner</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className={styles.teamInfo}>
                  <h2 className={styles.teamName}>{team.name}</h2>
                  <p className={styles.teamDesc}>{team.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Coming Soon ───────────────────────────────────────────── */}
      <div className={styles.comingSoon}>
        <p className={styles.comingSoonText}>{t('majorTeams.comingSoon')}</p>
      </div>
    </div>
  );
}
