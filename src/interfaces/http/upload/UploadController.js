const { Router } = require('express');
const { inject } = require('awilix-express');
const uploadFile = require("./UploadMiddleware");
const Status = require('http-status');
const response = require('./../utils/response');
const fs = require('fs');
const { withJWTAuthMiddleware } = require("express-kun");

const UploadController = {
  get router() {
    const router = Router();

    const protectedRouter = withJWTAuthMiddleware(router, process.env.JSON_PWD_SECRET);

    
    router.post('',inject('module'), this.create);
    router.get('/',inject('module'), this.getImage);
    router.get('/:file',inject('module'), this.getImagebyPath);

    return router;
  },

  getImage(req, res, next) {
    var filepath = __basedir + "/resources/uploads/"+req.query.file;
   
    try {
      if (fs.existsSync(filepath)) {
        //file exists
        res.sendFile(filepath);
      }else{
        res.send(`File Not found`);
      }
    } catch(err) {
      res.send(`File Not found`);
    }
  },

  getImagebyPath(req, res, next) {
    var filepath = __basedir + "/resources/uploads/"+req.params.file;
    res.sendFile(filepath);
  },

  async create(req, res, next) {
    try {

      const { module } = req;
      const { SUCCESS, ERROR, VALIDATION_ERROR } = module.outputs;

      await uploadFile(req, res);

      if (req.file == undefined) {

        return response(res, Status.BAD_REQUEST, null, "", "Please upload the file")
      }

      const file = {
        "location": __basedir + "/resources/uploads/"+req.file.filename,
        "fileName": req.file.filename
      }
    
      req.file.destination = "NOT_DISCLOSED_";
      req.file.path = "NOT_DISCLOSED_";


      req.file.filename= "/upload/"+req.file.filename;
      
      var sizeOf = require('image-size');
      var dimensions = sizeOf(file.location); // replace with your image
      
      req.file.height = dimensions.height;
      req.file.width = dimensions.width;

      module
      .on(SUCCESS, (data) => {
        response(res, Status.OK, req.file, "Uploaded the file successfully", "")
      })
      .on(VALIDATION_ERROR, (error) => {
        response(res, Status.BAD_REQUEST, null, "", error)
      })
      .on(ERROR, (error) => {
        response(res, Status.INTERNAL_SERVER_ERROR, null, "", error)
      });

      module.add_medias(req);

    } catch (err) {
      
      return response(res, Status.BAD_REQUEST, null, "", `Could not upload the file: ${req.file}`)

    }
  },
};


module.exports = UploadController;
