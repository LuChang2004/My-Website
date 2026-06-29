import { Routes, Route, Navigate, useLocation } from 'react-router';
import FinalLimbFantasyPage from './pages/FinalLimbFantasyPage';
import AxiomBreachPage from './pages/AxiomBreachPage';
import TaylorSwiftPage from './pages/TaylorSwiftPage';
import ChordDiaryPage from './pages/ChordDiaryPage';
import PdfProjectPage from './pages/PdfProjectPage';
import SolarSpecialPage from './pages/SolarSpecialPage';
import UserResearchPage from './pages/UserResearchPage';
import StylingInspirationBookPage from './pages/StylingInspirationBookPage';
import FloorTileMosaicLineGeneratorPage from './pages/FloorTileMosaicLineGeneratorPage';
import HubTabLayout from './hub/HubTabLayout';
import { isHubTabPath } from './hub/hubTabs';

function LegacyHashRedirect() {
  const location = useLocation();
  if (location.pathname === '/' && location.hash === '#works') {
    return <Navigate to="/works" replace />;
  }
  if (location.pathname === '/' && location.hash === '#contact') {
    return <Navigate to="/contact" replace />;
  }
  return null;
}

export default function App() {
  const location = useLocation();
  const isHubRoute = isHubTabPath(location.pathname);

  return (
    <>
      <LegacyHashRedirect />
      {isHubRoute ? (
        <HubTabLayout />
      ) : (
        <Routes location={location}>
          <Route path="/final-limb-fantasy" element={<FinalLimbFantasyPage />} />
          <Route path="/taylor-swift" element={<TaylorSwiftPage />} />
          <Route path="/axiom-breach" element={<AxiomBreachPage />} />
          <Route path="/chord-diary" element={<ChordDiaryPage />} />
          <Route path="/works/solar-special" element={<SolarSpecialPage />} />
          <Route path="/works/user-research" element={<UserResearchPage />} />
          <Route path="/works/styling-inspiration-book" element={<StylingInspirationBookPage />} />
          <Route path="/works/floor-tile-mosaic-line-generator" element={<FloorTileMosaicLineGeneratorPage />} />
          <Route path="/works/:projectId" element={<PdfProjectPage />} />
        </Routes>
      )}
    </>
  );
}
