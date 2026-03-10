# Comp DBD Place

A competitive Dead by Daylight hub — your one-stop resource for leagues, tournaments, ranked ladders, team profiles, and community events.

## Features

| Section            | Description                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Big Leagues**    | Directory of major comp DBD leagues and tournament series (DBDLeague, Hens333, Altruism League, COTF, Rasza Official) |
| **Ranked**         | Track MMR, match history, and climb the solo/team queue ladder                                                        |
| **1v1 Ladder**     | One killer, one survivor — the purest comp DBD format                                                                 |
| **Scrims**         | Organise practice sessions against other competitive teams                                                            |
| **Major Teams**    | Rosters and profiles for top-tier organisations                                                                       |
| **Tournaments**    | Community-posted tournament announcements with a moderated approval feed                                              |
| **Moderation**     | Admin panel to approve, deny, or delete tournament submissions                                                        |
| **Build Crafting** | Links out to [balancedbydaylight.com](https://balancedbydaylight.com) for killer/survivor build crafting              |

**Coming soon:** Team Finder · Stats Central

## Tech Stack

- [React 19](https://react.dev/) + [React Router v7](https://reactrouter.com/)
- [Vite 7](https://vitejs.dev/) — dev server and build tool
- CSS Modules — scoped component styles
- ESLint — linting

## Getting Started

**Prerequisites:** Node.js ≥ 18

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Production build (output: `dist/`)   |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── App.jsx                  # Root router
├── components/
│   ├── AnimatedText/        # Animated heading component
│   ├── Layout/              # Shared page shell (TopBar + outlet)
│   └── TopBar/              # Navigation bar
├── pages/
│   ├── MainPage/            # Landing / hero page
│   ├── BigLeagues/          # League directory
│   ├── DBDRanked/           # Ranked ladder info
│   ├── DBD1v1Ladder/        # 1v1 ladder info
│   ├── DBDScrims/           # Scrims info
│   ├── MajorTeams/          # Team profiles
│   ├── Tournaments/         # Community tournament feed
│   ├── CreateTournament/    # Submit a tournament
│   ├── Moderation/          # Moderation admin panel
│   ├── Tutorials/           # Competitive guides
│   └── SectionPage/         # Reusable section layout
└── utils/
    └── tournamentStore.js   # LocalStorage-backed tournament post store
```
# TODO

- Add back end DB for articles
- finish new coming features
- Make gracefull tutorials and other text in most of informational pages
