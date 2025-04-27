import { useEffect, useState } from "react";
import { fetchApps, launchApp, quitApp, playPauseVLC, stopVLC, nextVLC, setVLCVolume, getVLCStatus } from "../api";
import AppCard from "../components/AppCard";
import "../App.css";

export default function Launcher() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(256); 

  useEffect(() => {
    fetchApps().then(setApps);
    fetchVLCStatus();
  }, []);

  const fetchVLCStatus = async () => {
    try {
      const status = await getVLCStatus();
    
      if (status && status.volume !== undefined) {
        setVolume(status.volume);
      }
    } catch (error) {
      console.error("Failed to fetch VLC status:", error);
    }
  };

  const handleLaunch = async (app) => {
    setLoading(true);
    await launchApp(app);
  };

  const handleQuit = async () => {
    await quitApp();
    setLoading(false);
  };

  const handlePlayPause = async () => {
    await playPauseVLC();
    fetchVLCStatus();
  };

  const handleStop = async () => {
    await stopVLC();
    fetchVLCStatus();
  };

  const handleNext = async () => {
    await nextVLC();
    fetchVLCStatus();
  };

  const handleVolumeChange = async (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    await setVLCVolume(newVolume);
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
          <div className="vlc-controls" style={{ marginTop: "1rem" }}>
            <h3>VLC Controls</h3>
            <button onClick={handlePlayPause}>Play/Pause</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleNext}>Next</button>
            <label>
              Volume: {volume}
              <input
                type="range"
                min="0"
                max="512"
                value={volume}
                onChange={handleVolumeChange}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
