/* eslint-disable no-console */
const pm2 = require('pm2');

const instances = process.env.WEB_CONCURRENCY || -1;
const maxMemory = process.env.WEB_MEMORY || 512;

pm2.connect(() => {
  pm2.start({
    name: "Atrum",
    script: 'index.js',
    instances: instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: "development",
      PORT: 4010,
      NODE_PATH: '.'
    }
  }, (error) => {
    if (error) {
      return console.error('Error while launching applications', error.stack || error);
    }

    console.log('PM2 and application has been succesfully started');

    pm2.launchBus((error, bus) => {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', (packet) => {
        console.log('[App:%s] %s', packet.process.name, packet.data);
      });

      bus.on('log:err', (packet) => {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });
  });
});
