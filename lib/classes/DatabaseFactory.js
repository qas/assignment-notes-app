const {DatabaseKoa} = require('./DatabaseKoa');

/**
 * @class DatabaseFactory
 */
class DatabaseFactory {
  /**
   * @name getDatabaseInstance
   * @param {*} databaseProvider
   * @return {object} The database provider.
   */
  static getDatabaseInstance(databaseProvider) {
    if (databaseProvider === 'koa') return new DatabaseKoa();
    throw Error(`Database provider ${databaseProvider} is not recognized`);
  }
}

export {DatabaseFactory};
