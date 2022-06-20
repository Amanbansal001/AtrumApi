const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const response = require('./../utils/response');
const { withJWTAuthMiddleware } = require("express-kun");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const AuthController = {
  get router() {
    const router = Router();
    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    router.post('/login', inject('login'), this.login);
    router.post('/reset', inject('login'), this.reset);
    router.post('/reset/password', inject('login'), this.resetPwd);
    router.post('/admin/login', inject('login'), this.adminLogin);
    
    return router;
  },

  login(req, res, next) {
    const { login } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = login.outputs;

    login
      .on(SUCCESS, (user) => {


        response(res, Status.OK, { auth: user })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    login.execute(req);
  },

  reset(req, res, next) {
    const { login } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = login.outputs;

    login
      .on(SUCCESS, (user) => {


        response(res, Status.OK, { auth: user })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    login.execute_reset(req);
  },

  resetPwd(req, res, next) {

    req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');

    const { login } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = login.outputs;

    login
      .on(SUCCESS, (user) => {


        response(res, Status.OK, { auth: user })

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

    login.execute_resetPwd(req);
  },


  adminLogin(req, res, next) {

    const { login } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = login.outputs;

    login
      .on(SUCCESS, (user) => {


        response(res, Status.OK, { auth: user})

      })
      .on(NOT_FOUND, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      });

      login.execute_admin(req);
  },

};

module.exports = AuthController;
