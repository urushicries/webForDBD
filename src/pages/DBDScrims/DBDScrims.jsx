import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: 'Open Scrim Lobbies',
    body: 'Browse teams currently seeking opponents. Filter by region, skill band, and preferred killer pool. Join or post a scrim request in under 30 seconds.',
  },
  {
    headline: 'Scheduled Practice Blocks',
    body: 'Book recurring weekly slots with the same team for consistent structured practice. Automated reminders sent before each session.',
  },
  {
    headline: 'Custom Rule Sets',
    body: 'Run scrims under standard comp rules, relaxed ruleset, or create a custom ruleset for team-internal drills. Exported to easily share with opponents.',
  },
  {
    headline: 'Post-Scrim Review',
    body: 'Attach notes, screenshots, or VOD timestamps after each session. Build a review archive to track team-specific habits and counter-strategies.',
  },
  {
    headline: 'Team Roster Management',
    body: 'Manage your full five-player roster, substitutes, and roles. Invite players via username lookup or shareable link.',
  },
];

export default function DBDScrims() {
  return (
    <SectionPage
      title="DBD Scrims"
      subtitle="Find opponents, schedule practice sessions, and build your team's structured competitive preparation regimen."
      tag="Practice"
      items={ITEMS}
    />
  );
}
