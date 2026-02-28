import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: 'Perk Synergy Tool',
    body: 'Select perks, add-ons, and offerings for any killer or survivor. The tool highlights known synergies and flags perk slot conflicts used in competitive rulesets.',
  },
  {
    headline: 'Meta Tier List',
    body: 'Community-driven tier rankings updated after each patch. Breaks down which perks are viable in tournament settings versus solo queue.',
  },
  {
    headline: 'Shared Build Library',
    body: 'Browse and clone builds submitted by top-ranked players. Filter by killer, role, playstyle, or tournament legality.',
  },
  {
    headline: 'Patch Tracker',
    body: 'Every balance change annotated with competitive impact ratings. Know immediately when a previously banned perk becomes tourney-legal.',
  },
  {
    headline: 'Submit Your Build',
    body: 'Share your loadout with the community. Attach a match replay or VOD clip demonstrating the build in action. Open for peer review.',
  },
];

export default function MakeYourBuilds() {
  return (
    <SectionPage
      title="Make Your Builds"
      subtitle="Craft, compare, and share competitive loadouts. Explore perk synergies and community-vetted builds for every playstyle."
      tag="Build Crafting"
      items={ITEMS}
    />
  );
}
