const { spawn } = require('child_process');
const { e2eTestAppConfig } = require('./config');

module.exports = async () => {
  const env = {
    ...process.env,
    PORT: e2eTestAppConfig.port,
    MONGODB_URI: e2eTestAppConfig.mongoURI,
  };
  global.__APP_PROCESS__ = spawn('node', ['../backend/src/index.js'], { env });
};
