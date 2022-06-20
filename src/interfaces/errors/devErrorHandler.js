const Status = require('http-status');
const response = require('../http/utils/response');
/* istanbul ignore next */
module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err.stack);
  
  response(res,Status.INTERNAL_SERVER_ERROR,null,"",err.message);
};