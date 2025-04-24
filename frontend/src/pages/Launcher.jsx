import { useEffect, useState } from "react";
import { fetchApps, launchApp, quitApp } from "../api";
import AppCard from "../components/AppCard";
import "../App.css";

export default function Launcher() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApps().then(setApps);
  }, []);

  const handleLaunch = async (app) => {
    setLoading(true);
    await launchApp(app);
  };

  const handleQuit = async () => {
    await quitApp();
    setLoading(false);
  };

  return (
    <div className="launcher-container">
      <h2>App Launcher</h2>
      {loading && (
        <div className="loading-screen">
          <div>Loading...</div>
          <button onClick={handleQuit}>Home</button>
        </div>
      )}
      <div className="app-grid">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} onClick={handleLaunch} />
        ))}
      </div>
      {!loading && (
        <>
          <button onClick={handleQuit}>Home</button>
          <button onClick={() => (window.location.href = "/settings")}>
            Settings
          </button>
        </>
      )}
    </div>
  );
}
