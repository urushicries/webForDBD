import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: 'DBDLeague',
    body: 'The premier competitive league for Dead by Daylight. Featuring top-tier teams, high-stakes matches, and comprehensive coverage of every seasons tournament action.',
    href: 'https://dbdleague.com',
  },
  {
    headline: 'Hens333 Tournament Series',
    body: 'Swiss group stage feeds into a single-elimination playoff. Streamer-friendly format with a focus on exciting matchups and upsets.',
    href: 'https://hens333.com',
  },
  {
    headline: 'Altruism league',
    body: 'A community-driven competitive format that emphasizes teamwork and strategic coordination over individual skill. Teams are matched based on their overall performance and commitment to the community.',
    href: 'https://discord.gg/bhdvmXxB',
  },
  {
    headline: 'COTF',
    body: 'Champions of the Fog is a grassroots tournament series that has grown into a major fixture in the comp DBD scene. Known for its passionate community and high production values.',
    href: 'https://discord.gg/EPNyjBrt',
  },
  {
    headline: 'Rasza official',
    body: 'Raszas official tournament series, featuring a mix of open qualifiers and invite-only events. Known for its high level of competition and engaging commentary.',
    href: 'https://discord.gg/5a78d862',
  },
];

export default function BigLeagues() {
  return (
    <SectionPage
      title="Big Leagues"
      subtitle="High-stakes Dead by Daylight tournaments. Track brackets, VODs, standings, and team profiles for every comp event."
      tag="Tournaments"
      items={ITEMS}
    />
  );
}
