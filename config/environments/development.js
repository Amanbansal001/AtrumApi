const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 4010
  },
  logging: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: logPath }
    ]
  }
};
