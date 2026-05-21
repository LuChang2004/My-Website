import { Routes, Route } from 'react-router';
import HubPage from './pages/HubPage';
import FinalLimbFantasyPage from './pages/FinalLimbFantasyPage';
import AxiomBreachPage from './pages/AxiomBreachPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HubPage />} />
      <Route path="/final-limb-fantasy" element={<FinalLimbFantasyPage />} />
      <Route path="/axiom-breach" element={<AxiomBreachPage />} />
    </Routes>
  );
}
