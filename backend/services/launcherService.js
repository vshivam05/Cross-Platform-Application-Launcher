const { spawn } = require("child_process");
const fs = require("fs");
const pathModule = require("path");

function launch(appPath, param = "") {
  if (!fs.existsSync(appPath)) {
    console.error(`❌ Executable not found: ${appPath}`);
    throw new Error(`Application not found at path: ${appPath}`);
  }

  const executable = 'explorer.exe'; 
  const params = param ? [param] : [appPath];

  console.log(`🚀 Launching app: ${executable} ${param || appPath}`);
  const child = spawn(executable, params, {
    detached: true,
    stdio: "ignore", 
  });

  child.unref(); 
  return child;
}

function kill(process) {
  if (process) {
    console.log("🛑 Killing process...");
    process.kill();
  }
}

module.exports = { launch, kill };
