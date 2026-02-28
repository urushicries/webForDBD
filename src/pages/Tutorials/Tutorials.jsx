import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: 'Killer Fundamentals',
    body: 'Core mechanics every competitive killer must master: patrol routing, mind-game techniques, pressure management, and map-specific strategies.',
  },
  {
    headline: 'Survivor Coordination',
    body: 'How to communicate efficiently with three teammates, split generator assignments, and execute last-minute escapes under pressure.',
  },
  {
    headline: 'Advanced Chase Techniques',
    body: 'Frame-perfect vaults, dead-hard timings, head-on setups, and looping strong tiles against top-tier killers. Annotated VOD clips included.',
  },
  {
    headline: 'Competitive Ruleset Primer',
    body: 'A complete breakdown of banned perks, add-ons, offerings, and map restrictions used across major tournaments. Required reading before entering any bracket.',
  },
  {
    headline: 'VOD Review Methodology',
    body: 'How to analyze your own film: what to look for, how to identify decision errors, and how to structure a productive post-game review session.',
  },
];

export default function Tutorials() {
  return (
    <SectionPage
      title="Tutorials"
      subtitle="Structured guides to sharpen every dimension of your competitive game — from fundamentals to frame-data deep dives."
      tag="Education"
      items={ITEMS}
    />
  );
}
