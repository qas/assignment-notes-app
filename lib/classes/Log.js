/* eslint-disable no-console */
const util = require('util');
const pkgInfo = require('../../package.json');
const {config} = require('../../config');

/**
 * @class Log
 */
class Log {
  /**
   * @name error
   * @param {*} meta
   * @param {*} err
   */
  error(meta = {}, err) {
    this.log('error', Log.generate({
      msg: util.inspect(err),
      err,
      meta,
      level: 'error',
    }));
  }

  /**
   * @name error
   * @param {*} meta
   * @param {*} msg
   */
  warn(meta = {}, msg) {
    this.log('warn', Log.generate({
      msg,
      meta,
      level: 'warn',
    }));
  }

  /**
   * @name error
   * @param {*} meta
   * @param {*} msg
   */
  info(meta = {}, msg) {
    this.log('info', Log.generate({
      msg,
      meta,
      level: 'info',
    }));
  }

  /**
   * @name error
   * @param {*} level
   * @param {*} message
   * @param {*} meta
   */
  log(level, message, meta = null) {
    switch (level) {
      case 'info':
        console.info(message);
        break;
      case 'warn':
        // tslint:disable-next-line:no-console
        console.warn(message);
        break;
      case 'error':
        // tslint:disable-next-line:no-console
        console.error(message);
        break;
      default:
        throw new Error(`${level} is not an acceptable log level.`);
    }
  }

  /**
   * @name generate
   * @param {*} payload
   * @return {object}
   */
  static generate(payload = {}) {
    // default log attributes
    const defaults = {
      msg: '',
      env: config.ENV,
      app: config.NAME,
      version: pkgInfo.version,
    };
    return Object.assign(defaults, payload);
  }
}

module.exports = {Log};
