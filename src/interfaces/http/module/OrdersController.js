const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const { withJWTAuthMiddleware } = require("express-kun");

const response = require('../utils/response');

const OrdersController = {
  get router() {
    const router = Router();

    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    router.get('/', inject('module'), this.index);
    router.get('/:id', inject('module'), this.show);
    protectedRouter.post('/', inject('module'), this.create);
    protectedRouter.put('/:id', inject('module'), this.update);

    return router;
  },

  index(req, res, next) {
    const { module } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = module.outputs;

    module
      .on(SUCCESS, (data) => {
        response(res, Status.OK, { fetch: data })
      })
      .on(VALIDATION_ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.INTERNAL_SERVER_ERROR, null, "", error)
      });

    module.get_orders(req);
  },

  show(req, res, next) {
    const { module } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = module.outputs;

    module
      .on(SUCCESS, (data) => {
        response(res, Status.OK, { fetch: data })
      })
      .on(VALIDATION_ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.INTERNAL_SERVER_ERROR, null, "", error)
      });

    module.get_orders_id(Number(req.params.id));
  },

  create(req, res, next) {
    const { module } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = module.outputs;

    module
      .on(SUCCESS, (data) => {
        response(res, Status.OK, { fetch: data })
      })
      .on(VALIDATION_ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.INTERNAL_SERVER_ERROR, null, "", error)
      });

    module.add_orders(req);
  },

  update(req, res, next) {
    const { module } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = module.outputs;

    module
      .on(SUCCESS, (data) => {
        response(res, Status.OK, { fetch: data })
      })
      .on(VALIDATION_ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.INTERNAL_SERVER_ERROR, null, "", error)
      });

    module.update_orders(req);
  },


};

module.exports = OrdersController;