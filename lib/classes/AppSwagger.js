const {App} = require('./App');
const {DatabaseFactory} = require('./DatabaseFactory');
const {RouterFactory} = require('./RouterFactory');
const {LogFactory} = require('./LogFactory');
const {config} = require('../../config');

/** Middleware */
const {errorHandler} = require('../middleware/errorHandler');
const {logHandler} = require('../middleware/logHandler');
const {responseHandler} = require('../middleware/responseHandler');

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
    await this.setMiddleware();
    /* ------------------ */
    this.isReady()
      ? this.logger.info('App initialization complete')
      : this.logger.error('App initialization failure');
    return this;
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
   * @name setMiddleware
   * @param {Array} routes
   * @return {this}
   */
  async setMiddleware() {
    /** Set middleware */
    await this.router.app.use(responseHandler());
    await this.router.app.use(errorHandler());
    // await this.router.app.use(logHandler({
    //   logger: this.logger}));

    /** Bootstrap app router */
    // App.use(router.routes());
    // App.use(router.allowedMethods());

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

exports.AppSwagger = AppSwagger;
