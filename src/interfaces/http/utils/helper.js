const crypto = require("crypto");
var randomstring = require("randomstring");
module.exports = {

    generateOTP() {

        // Declare a digits variable  
        // which stores all digits 
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 5; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        //return "12345";
        return OTP;
    },

    yymmdd(date, delimitor = "-") {
        var today = new Date(date);
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = `${yyyy}${delimitor}${mm}${delimitor}${dd}`;
        return today;
    },

    yymmddHHiiss(date, delimitor = "-") {
        var today = new Date(date);
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = `${yyyy}${delimitor}${mm}${delimitor}${dd} 00:00:00`;
        return today;
    },
}

