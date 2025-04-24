import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Launcher from "./pages/Launcher";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
