const { spawn } = require('child_process');

module.exports = async () => {
  const env = { ...process.env, PORT: 5000 };
  global.__APP_PROCESS__ = spawn('node', ['../backend/src/index.js'], { env });
};
