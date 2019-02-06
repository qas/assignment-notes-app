const {Log} = require('./Log');

/**
 * @class LogFactory
 */
class LogFactory {
  /**
   * @name getLogInstance
   * @param {*} logProvider
   * @return {object} The log provider.
   */
  static getLogInstance(logProvider) {
    if (logProvider === 'console') return new Log();
    throw Error(`Logging provider ${logProvider} is not recognized`);
  }
}

module.exports = {LogFactory};
