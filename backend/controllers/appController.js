const { readApps, writeApps } = require("../utils/fileManager");
const { launch, kill } = require("../services/launcherService");

let runningProcess = null;

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

exports.launchApp = (req, res) => {
  try {
    runningProcess = launch(req.body.path, req.body.param);
    res.send({ status: "launched" });
  } catch (error) {
    console.error("Error launching app:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.quitApp = (req, res) => {
  if (runningProcess) {
    kill(runningProcess);
    runningProcess = null;
  }
  res.send({ status: "stopped" });
};
