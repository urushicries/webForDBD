import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import BigLeagues from './pages/BigLeagues/BigLeagues';
import DBDScrims from './pages/DBDScrims/DBDScrims';
import DBDRanked from './pages/DBDRanked/DBDRanked';
import Tutorials from './pages/Tutorials/Tutorials';
import DBD1v1Ladder from './pages/DBD1v1Ladder/DBD1v1Ladder';
import MajorTeams from './pages/MajorTeams/MajorTeams';
import Tournaments from './pages/Tournaments/Tournaments';
import CreateTournament from './pages/CreateTournament/CreateTournament';
import Moderation from './pages/Moderation/Moderation';
import Auth from './pages/Auth/Auth';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"              element={<MainPage />} />
          <Route path="/big-leagues"   element={<BigLeagues />} />
          <Route path="/dbd-scrims"    element={<DBDScrims />} />
          <Route path="/dbd-ranked"    element={<DBDRanked />} />
          <Route path="/tutorials"     element={<Tutorials />} />
          <Route path="/1v1-ladder"    element={<DBD1v1Ladder />} />
          <Route path="/major-teams"       element={<MajorTeams />} />
          <Route path="/tournaments"         element={<Tournaments />} />
          <Route path="/create-tournament"   element={<CreateTournament />} />
          <Route path="/auth"                element={<Auth />} />
          <Route path="/moderation"          element={<ProtectedRoute adminOnly><Moderation /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
