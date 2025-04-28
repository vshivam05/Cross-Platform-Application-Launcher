const { spawn } = require("child_process");
const net = require("net");


let mediaPlayerProcess = null;
let client = null;




function launchVLC(path, param = "") {
  if (mediaPlayerProcess) {
    killMediaPlayer();
  }

 
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
  if (client)  {
    client.destroy();
    client = null;
  }
}

const axios = require("axios");


const VLC_HTTP_BASE_URL = "http://localhost:8080";
const VLC_HTTP_PASSWORD = "Shivam@123"; 



async function vlcHttpRequest(path, method = "GET", params = {}) {
  const url = `${VLC_HTTP_BASE_URL}${path}`;
  const auth = {
    username: "",
    password: VLC_HTTP_PASSWORD,
  };
  try {
    const response = await axios({
      method,
      url,
      auth,
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(`VLC HTTP request failed: ${error.message}`);
  }
}


async function getStatus() {
  return vlcHttpRequest("/requests/status.json");
}

async function playPause() {
  return vlcHttpRequest("/requests/status.json", "GET", { command: "pl_pause" });
}

async function stop() {
  return vlcHttpRequest("/requests/status.json", "GET", { command: "pl_stop" });
}

async function next() {
  return vlcHttpRequest("/requests/status.json", "GET", { command: "pl_next" });
}

async function setVolume(volume) {
  
  return vlcHttpRequest("/requests/status.json", "GET", { command: "volume", val: volume });
}

module.exports = {
  launchVLC,
  connectToVLC,
  sendCommand,
  killMediaPlayer,
  getStatus,
  playPause,
  stop,
  next,
  setVolume,
};
