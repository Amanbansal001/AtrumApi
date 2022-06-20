const express = require('express');

class Server {
  constructor({ config, router, logger,moduleRepository }) {
    this.config = config;
    this.logger = logger;
    this.moduleRepository = moduleRepository;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      //this.seeder();
      const http = this.express
        .listen(this.config.web.port, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }

  async seeder() {
    
  }
}

module.exports = Server;
