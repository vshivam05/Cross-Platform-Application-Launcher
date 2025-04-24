const { spawn } = require("child_process");
const fs = require("fs");
const pathModule = require("path");

function launch(appPath, param = "") {
  // Validate if the executable exists
  if (!fs.existsSync(appPath)) {
    console.error(`❌ Executable not found: ${appPath}`);
    throw new Error(`Application not found at path: ${appPath}`);
  }

  // If you're trying to open a folder, use explorer.exe to open the folder
  const executable = 'explorer.exe'; // For Windows, to open folders
  const params = param ? [param] : [appPath];

  // Launch the application or open folder with explorer
  console.log(`🚀 Launching app: ${executable} ${param || appPath}`);
  const child = spawn(executable, params, {
    detached: true,
    stdio: "ignore", // Detach cleanly
  });

  child.unref(); // Ensure it continues running independently
  return child;
}

function kill(process) {
  if (process) {
    console.log("🛑 Killing process...");
    process.kill();
  }
}

module.exports = { launch, kill };
