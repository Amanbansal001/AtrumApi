const email = require("../interfaces/http/utils/email");

class Application {
  constructor({ server, database, logger,UserCartsModel,ProductsModel,UsersModel}) {
    this.server = server;
    this.database = database;
    this.logger = logger;
    this.UserCartsModel=UserCartsModel;
    this.ProductsModel=ProductsModel;
    this.UsersModel=UsersModel;

    if(database && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    
    if(this.database) {
      await this.database.authenticate();
    }

    await this.server.start();
  }
}

module.exports = Application;
