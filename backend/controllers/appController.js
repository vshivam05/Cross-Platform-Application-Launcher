const { readApps, writeApps } = require("../utils/fileManager");
const { launch, kill } = require("../services/launcherService");
const {
  launchVLC,
  connectToVLC,
  sendCommand,
  killMediaPlayer,
} = require("../services/mediaPlayerService");

const {
  getStatus,
  playPause,
  stop,
  next,
  setVolume,
} = require("../services/mediaPlayerService");

let runningProcess = null;
let mediaPlayerRunning = false;

exports.getApps = (req, res) => {
  res.json(readApps());
};

exports.addApp = (req, res) => {
  const apps = readApps();
  const newApp = { id: Date.now(), ...req.body };
  apps.push(newApp);
  writeApps(apps);
  res.status(201).json(newApp);
};

exports.deleteApp = (req, res) => {
  let apps = readApps();
  apps = apps.filter((app) => app.id != req.params.id);
  writeApps(apps);
  res.sendStatus(204);
};

exports.launchApp = async (req, res) => {
  try {
    if (req.body.name === "vlc") {
      if (mediaPlayerRunning) {
        return res.status(400).json({ error: "Media player already running" });
      }
      mediaPlayerRunning = true;
      launchVLC(req.body.path, req.body.param);
      await connectToVLC();
      res.send({ status: "media player launched" });
    } else {
      runningProcess = launch(req.body.path, req.body.param);
      res.send({ status: "launched" });
    }
  } catch (error) {
    console.error("Error launching app:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.quitApp = (req, res) => {
  if (mediaPlayerRunning) {
    killMediaPlayer();
    mediaPlayerRunning = false;
    return res.send({ status: "media player stopped" });
  }
  if (runningProcess) {
    kill(runningProcess);
    runningProcess = null;
  }
  res.send({ status: "stopped" });
};


exports.mediaPlayerControl = async (req, res) => {
  try {
    const { command } = req.body;
    await sendCommand(command);
    res.send({ status: "command sent" });
  } catch (error) {
    console.error("Error sending media player command:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getVLCStatus = async (req, res) => {
  try {
    const status = await getStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting VLC status:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.playPauseVLC = async (req, res) => {
  try {
    await playPause();
    res.json({ status: "play/pause toggled" });
  } catch (error) {
    console.error("Error toggling play/pause:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.stopVLC = async (req, res) => {
  try {
    await stop();
    res.json({ status: "stopped" });
  } catch (error) {
    console.error("Error stopping VLC:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.nextVLC = async (req, res) => {
  try {
    await next();
    res.json({ status: "next track" });
  } catch (error) {
    console.error("Error going to next track:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.setVLCVolume = async (req, res) => {
  try {
    const { volume } = req.body;
    if (typeof volume !== "number") {
      return res.status(400).json({ error: "Volume must be a number" });
    }
    await setVolume(volume);
    res.json({ status: `volume set to ${volume}` });
  } catch (error) {
    console.error("Error setting volume:", error.message);
    res.status(500).json({ error: error.message });
  }
};
