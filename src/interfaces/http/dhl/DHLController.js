const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const response = require('../utils/response');
const { withJWTAuthMiddleware } = require("express-kun");

const DHLController = {
  get router() {
    const router = Router();
    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    router.get('/', inject('dhl'), this.getLocationById);
    router.post('/taxes', inject('dhl'), this.taxes);

    return router;
  },

  getLocationById(req, res, next) {
    const { dhl } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = dhl.outputs;

    dhl
      .on(SUCCESS, (dhl) => {


        response(res, Status.OK, { ...dhl })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    dhl.getLocationById(req);
  },

  taxes(req, res, next) {
    const { dhl } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = dhl.outputs;

    dhl
      .on(SUCCESS, (rates) => {


        response(res, Status.OK, { ...rates })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    dhl.taxes(req);
  },

};

module.exports = DHLController;
