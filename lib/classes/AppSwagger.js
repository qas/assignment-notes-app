const lodashId = require('lodash-id');
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
   */
  async initialize() {
    this.router = RouterFactory.getRouterInstance('koa');
    this.logger = LogFactory.getLogInstance('console');
    this.setupDatabase();
    await this.setMiddleware();
  }

  /**
   * @name setRoutes
   * @param {Array} routes
   */
  setRoutes(routes) {
    this.router.setApp(this);

    if (routes) {
      for (const route of routes) {
        this.router.addRoute(route);
      }
    }
  }

  /**
   * @name start
   * @param {Array} routes
   * @return {*} app.
   */
  async start(routes) {
    const app = await this.router.start();
    /* ------------------ */
    this.isReady()
      ? this.logger.info('App start complete')
      : this.logger.error('App start failure');
    return app;
  }

  /**
   * @name setMiddleware
   * @param {Array} routes
   * @return {this}
   */
  async setMiddleware() {
    await this.router.app.use(responseHandler());
    await this.router.app.use(errorHandler());
    await this.router.app.use(logHandler({
      logger: this.logger}));
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
    // Set some defaults (required if your JSON file is empty)
    this.databases.primary.db.defaults({notes: []}).write();
    this.databases.primary.db._.mixin(lodashId);
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
