import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import BigLeagues from './pages/BigLeagues/BigLeagues';
import DBDScrims from './pages/DBDScrims/DBDScrims';
import DBDRanked from './pages/DBDRanked/DBDRanked';
import Tutorials from './pages/Tutorials/Tutorials';
import DBD1v1Ladder from './pages/DBD1v1Ladder/DBD1v1Ladder';
import MajorTeams from './pages/MajorTeams/MajorTeams';

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
          <Route path="/major-teams"   element={<MajorTeams />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
