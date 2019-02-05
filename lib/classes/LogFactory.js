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
    switch (logProvider) {
      case 'console':
        return new Log();
      default:
        throw Error(`Logging provider ${logProvider} is not recognized`);
    }
  }
}

export {LogFactory};
