const util = require("util");
const multer = require("multer");
var path = require('path')
const maxSize = 10 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var filepath = __basedir 
                        + "/resources/uploads/"
                        + '/';
      
        cb(null, filepath);
    },
    filename: (req, file, cb) => {
        file.originalname =  Date.now()+path.extname(file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let UploadMiddleware = util.promisify(uploadFile);
module.exports = UploadMiddleware;