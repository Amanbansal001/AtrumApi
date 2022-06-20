module.exports = {
  apps: [{
    name: 'atrum',
    script: './index.js',
    autorestart: true,
    exec_mode: "cluster",
    watch: false,
    merge_logs: true,
    time: true,
    env_development: {
      "PORT": 8090,
      "NODE_ENV": "development",
      NODE_PATH: '.'
    },
  }]
};
