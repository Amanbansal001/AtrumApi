require('dotenv').load();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();

console.log(ENV);
console.log(dbConfig);


// site
//6LfhwgAeAAAAAN61obfmj54G8Ui1Ej2ywM4CO4fA

// Secret
//6LfhwgAeAAAAAC2vrnEUlhzBZx6cCg_FFjjbr0ul
const config = Object.assign({
  [ENV]: true,
  env: ENV,
  db: dbConfig,
  sessonExpire: "30d",
  vendor:{
    api:{
      otp:[]
    },
    apiFunc: {
      saveOTP: (otpModel) => {
        let idx = config.vendor.api.otp.findIndex(e => e.mobile == otpModel.mobile);

        if (idx >= 0) {
          config.vendor.api.otp[idx] = otpModel;
        } else {
          config.vendor.api.otp.push(otpModel);
        }
      }
    }
  }
}, envConfig);

module.exports = config;

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }
}
