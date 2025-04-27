const { spawn } = require("child_process");
const net = require("net");

let mediaPlayerProcess = null;
let client = null;

// Launch VLC with RC interface enabled on a specific port (e.g., 4212)
function launchVLC(path, param = "") {
  if (mediaPlayerProcess) {
    killMediaPlayer();
  }

  // Example VLC command with RC interface enabled
  const args = [
    path,
    param,
    "--extraintf",
    "rc",
    "--rc-host",
    "127.0.0.1:4212",
    "--rc-quiet",
  ];

  mediaPlayerProcess = spawn("vlc", args, {
    detached: true,
    stdio: "ignore",
  });

  mediaPlayerProcess.unref();
  return mediaPlayerProcess;
}

// Connect to VLC RC interface via TCP
function connectToVLC() {
  return new Promise((resolve, reject) => {
    client = new net.Socket();
    client.connect(4212, "127.0.0.1", () => {
      resolve();
    });
    client.on("error", (err) => {
      reject(err);
    });
  });
}

// Send command to VLC RC interface
function sendCommand(command) {
  return new Promise((resolve, reject) => {
    if (!client) {
      reject(new Error("Not connected to media player"));
      return;
    }
    client.write(command + "\n", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function killMediaPlayer() {
  if (mediaPlayerProcess) {
    mediaPlayerProcess.kill();
    mediaPlayerProcess = null;
  }
  if (client) {
    client.destroy();
    client = null;
  }
}

module.exports = {
  launchVLC,
  connectToVLC,
  sendCommand,
  killMediaPlayer,
};
