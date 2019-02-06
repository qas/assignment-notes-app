const {App} = require('./App');
const {DatabaseFactory} = require('./DatabaseFactory');
const {RouterFactory} = require('./RouterFactory');
const {LogFactory} = require('./LogFactory');
const {config} = require('../../config');

// /** Middleware */
// const {errorHandler} = require('../lib/middleware/errorHandler');
// const {logHandler} = require('../lib/middleware/logHandler');
// const {responseHandler} = require('../lib/middleware/responseHandler');

// /** Set environment */
// App.setEnvironment(process.NODE_ENV || 'development');
// App.setApplicationName(config.APP.NAME);

// /** Set middleware */
// App.use(errorHandler());
// App.use(logHandler({
//   logger: Logger}));
// App.use(responseHandler());

// /** Bootstrap app router */
// App.use(router.routes());
// App.use(router.allowedMethods());

/**
 * @class SwaggerApp
 */
class AppSwagger extends App {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.databases = {};
    this.ready = false;
  }

  /**
   * @name initialize
   * @return {this}
   */
  async initialize() {
    this.logger = LogFactory.getLogInstance('console');
    this.setupDatabase();
    await this.router.initialize();
    this.isReady()
      ? this.logger.info('App initialization complete')
      : this.logger.error('App initialization failure');
    return this;
  }

  /**
   * @name initialize
   * @param {Number} val
   * @return {this}
   */
  setPort(val) {
    return this.port = val;
  }

  /**
   * @name setRoutes
   * @param {Array} routes
   * @return {this}
   */
  setRoutes(routes) {
    this.router = RouterFactory.getRouterInstance('koa');
    this.router.setApp(this);

    if (routes) {
      for (const route of routes) this.router.addRoute(route);
    }

    return this;
  }

  /**
   * @name isReady
   * @return {this}
   */
  isReady() {
    return this.ready;
  }

  /**
   * @name setupDatabase
   */
  setupDatabase() {
    const Database = DatabaseFactory.getDatabaseInstance(config.DATABASE_TYPE);
    Database.setName(config.DATABASE_NAME);
    Database.setAdapter(config.DATABASE_HOST);
    Database.connect();
    this.databases.primary = Database;
    this.ready = true;
  }

  /**
   * @name shutdown
   */
  shutdown() {
    this.ready = false;
    this.logger.info('App has been shut down.');
  }
}

module.exports = {AppSwagger};
