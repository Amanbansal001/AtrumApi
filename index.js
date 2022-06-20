const container = require('./src/container');
const app = container.resolve('app');
const cron = container.resolve('cron');
const DataTypes = require('sequelize/lib/data-types')

app
  .start()
  .catch((error) => {
    app.logger.error(error.stack);
    process.exit();
  });

cron.start();

/**
 *  // Prototyping
 * @saurabhchhabra
 */
Date.prototype.toMysql = function () { return new Date(this.getTime()).toISOString().replace(/T/, ' ').replace(/\..+/, ''); };

Object.defineProperty(global, '__function', {
  get: function () {
    console.log(__stack[1].getFunctionName());
    return __stack[1].getFunctionName();
  }
});

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer.from(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer.from(b64Encoded, 'base64').toString('binary');
  };
}

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SSS')
}

global.__basedir = __dirname;