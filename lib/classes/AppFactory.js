const {AppSwagger} = require('./AppSwagger');

/**
 * @class AppFactory
 */
class AppFactory {
  /**
   * @name getAppInstance
   * @param {*} appProvider
   * @return {object} The app provider.
   */
  static getAppInstance(appProvider) {
    if (appProvider === 'swagger') return new AppSwagger();
    throw Error(`App provider ${appProvider} is not recognized`);
  }
}

module.exports = {AppFactory};
