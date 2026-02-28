import SectionPage from '../SectionPage/SectionPage';

const ITEMS = [
  {
    headline: '1v1 Format',
    body: 'One killer versus one survivor. Controlled map pool, fixed perk restrictions, and a best-of-three structure. Pure mechanics — no team coordination to hide behind.',
  },
  {
    headline: 'Ladder & Rankings',
    body: 'Earn MMR with every match. The ladder resets seasonally, with the top 32 players qualifying for the end-of-season invitational bracket.',
  },
  {
    headline: 'Map & Perk Ruleset',
    body: 'Agreed-upon map veto before each series. A curated ban list removes overperforming add-ons and offering stacks to keep results skill-dependent.',
  },
  {
    headline: 'Match Submission',
    body: 'Submit results via screenshot or short clip. Disputed outcomes are reviewed within 24 hours by a volunteer moderator panel.',
  },
  {
    headline: 'Hall of Fame',
    body: 'Seasonal champions and peak-rank holders are preserved in the Hall of Fame. Filter by killer main, region, or season number.',
  },
];

export default function DBD1v1Ladder() {
  return (
    <SectionPage
      title="1v1 DBD Ladder"
      subtitle="Solo killer versus solo survivor. Climb the most unforgiving format in competitive Dead by Daylight — no teammates, no excuses."
      tag="1v1 Ladder"
      items={ITEMS}
    />
  );
}
