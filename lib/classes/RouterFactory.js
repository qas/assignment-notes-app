const {RouterKoa} = require('./RouterKoa');

/**
 * @class RouterFactory
 */
class RouterFactory {
  /**
   * @name getRouterInstance
   * @param {*} routerProvider
   * @return {object} The router provider.
   */
  static getRouterInstance(routerProvider) {
    switch (routerProvider) {
      case 'koa':
        return new RouterKoa();
      default:
        throw Error(`Router provider 
          ${routerProvider} is not recognized`);
    }
  }
}

export {RouterFactory};
