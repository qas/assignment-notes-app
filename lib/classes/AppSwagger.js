const {App} = require('./App');
const {DatabaseFactory} = require('./DatabaseFactory');
const {LogFactory} = require('./LogFactory');
const config = require('../../config');

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
  initialize() {
    this.logger = LogFactory.getLogInstance('console');
    this.setupDatabase();
    this.isReady()
      ? this.logger.log('App initialization complete')
      : this.logger.log('App initialization failure');
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
    const Database = DatabaseFactory.getDatabaseInstance('lowdb');
    Database.setName(config.DATABASE.LOWDB.NAME);
    Database.setAdapter(config.DATABASE.LOWDB.FILEPATH);
    Database.connect();
    this.databases.primary = Database;
    this.ready = true;
  }

  /**
   * @name shutdown
   */
  shutdown() {
    this.ready = false;
    this.logger.info('App has shut down.');
  }
}

module.exports = {AppSwagger};
