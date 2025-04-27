const express = require("express");
const router = express.Router();
const {
  getApps,
  addApp,
  deleteApp,
  launchApp,
  quitApp,
  getVLCStatus,
  playPauseVLC,
  stopVLC,
  nextVLC,
  setVLCVolume,
} = require("../controllers/appController");

router.get("/apps", getApps);
router.post("/apps", addApp);
router.delete("/apps/:id", deleteApp);
router.post("/launch", launchApp);
router.post("/quit", quitApp);

// VLC control routes
router.get("/vlc/status", getVLCStatus);
router.post("/vlc/playpause", playPauseVLC);
router.post("/vlc/stop", stopVLC);
router.post("/vlc/next", nextVLC);
router.post("/vlc/volume", setVLCVolume);

module.exports = router;
