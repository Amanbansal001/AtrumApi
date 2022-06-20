const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const { withJWTAuthMiddleware } = require("express-kun");

const response = require('../utils/response');

const ContactusCategorysController = {
  get router() {
    const router = Router();

    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    router.get('/', inject('module'), this.index);
    router.get('/:id', inject('module'), this.show);
    router.post('/', inject('module'), this.create);
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

    module.get_contactus_categorys(req);
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

    module.get_contactus_categorys_id(Number(req.params.id));
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

    module.add_contactus_categorys(req);
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

    module.add_contactus_categorys(req);
  },


};

module.exports = ContactusCategorysController;