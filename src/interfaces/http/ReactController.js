const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
const path = require('path');
var express = require('express');
const fs = require('fs')

const ReactController = {
  get router() {
    const router = Router();   
    router.use(express.static(path.join(__dirname, '/../../../build')));
    router.get('*', this.reactApp);

    return router;
  },

  reactApp(req, res, next){
    if (fs.existsSync(__basedir+'/build/index.html')) {//file exists
      res.sendFile(path.join(__basedir, '/build', 'index.html'));
    }
  },
};


module.exports = ReactController;
