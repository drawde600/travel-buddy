const { spawn } = require("node:child_process");
const path = require("node:path");

const expoCli = path.join(__dirname, "..", "node_modules", "expo", "bin", "cli");
const args = [expoCli, "start", ...process.argv.slice(2)];

const child = spawn(process.execPath, args, {
  cwd: path.join(__dirname, ".."),
  env: {
    ...process.env,
    EXPO_NO_DEPENDENCY_VALIDATION: "1"
  },
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
