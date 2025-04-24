const express = require("express");
const router = express.Router();
const {
  getApps,
  addApp,
  deleteApp,
  launchApp,
  quitApp,
} = require("../controllers/appController");

router.get("/apps", getApps);
router.post("/apps", addApp);
router.delete("/apps/:id", deleteApp);
router.post("/launch", launchApp);
router.post("/quit", quitApp);

module.exports = router;
