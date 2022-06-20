const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const response = require('../utils/response');
const { withJWTAuthMiddleware } = require("express-kun");

const PaymentController = {
  get router() {
    const router = Router();
    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    router.post('/', inject('payment'), this.payment);

    return router;
  },

  payment(req, res, next) {
    const { payment } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = payment.outputs;

    payment
      .on(SUCCESS, (payment) => {


        response(res, Status.OK, { payment: payment })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    payment.execute(req);
  },

};

module.exports = PaymentController;
