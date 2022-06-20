
const Status = require('http-status');

module.exports = function (res, code, data, message=null, errorMessage=null,fieldsValidation=null) {

    const ok_range = (code >= Status.OK && code < Status.MULTIPLE_CHOICES)?true:false; 

    // check error Message & stack trace
    if(errorMessage){
        
        if(errorMessage.details){
            errorMessage = errorMessage.details;
            
            if(errorMessage instanceof Array){
                fieldsValidation = errorMessage;
                errorMessage = "Kindly fill complete form to proceed";
            }
        }else if(errorMessage.name && errorMessage.name=="SequelizeDatabaseError"){
            errorMessage = errorMessage.message;
        }
        
    }

    // Default Value Handled for success
    if(ok_range && !message){
        message = "Success"
    }

    // Default Value Handled for Error
    if(!ok_range && !errorMessage){
        //errorMessage = "Server not able to handle request"
    }

    
    if(typeof errorMessage=="object"){
        if(!ok_range){
            errorMessage = "Something went wrong";
        }else{
            errorMessage=""
        }
    }

    res
        .status(ok_range ? 200: code)
        .json({
            status: ok_range ? true : false,
            code: code,
            data: data,
            message: message || "",
            errorMessage: errorMessage || "",
            fieldsValidation:fieldsValidation,
        });
};