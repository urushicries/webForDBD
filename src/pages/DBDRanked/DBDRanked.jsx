import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: 'Solo Queue Ladder',
    body: 'Ranked solo play with MMR-based matchmaking. Climb from Bronze to Grand Master across a 10-season competitive year. Season resets with soft rank decay.',
  },
  {
    headline: 'Match History & Stats',
    body: 'Detailed breakdowns of every ranked game: kills, escapes, hook counts, generator progression, and end-game score. Filterable by killer or survivor.',
  },
  {
    headline: 'MMR Transparency',
    body: 'See your hidden matchmaking rating alongside visible rank. Track how individual performance metrics affect MMR gain and loss per match.',
  },
  {
    headline: 'Peak Rank Profiles',
    body: 'Public player profiles display seasonal peak ranks, main roles, most-played killers, and recent performance trends.',
  },
  {
    headline: 'Leaderboards',
    body: 'Global and region-specific leaderboards updated every 24 hours. Compare your position among the top 1,000 players worldwide.',
  },
];

export default function DBDRanked() {
  return (
    <SectionPage
      title="DBD Ranked"
      subtitle="Compete in structured solo queue with transparent MMR, detailed match history, and seasonal leaderboards."
      tag="Ranked Ladder"
      items={ITEMS}
    />
  );
}
