module.exports = {
  apps: [
    {
      name: "atrum",
      script: "./index.js",
      watch: true,
      instance_var: 'INSTANCE_ID',
      env: {
        "PORT": 3000,
        "NODE_ENV": "dev"
      }
    }
  ]
}