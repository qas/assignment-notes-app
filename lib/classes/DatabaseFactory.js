const {DatabaseLowdb} = require('./DatabaseLowdb');

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
    if (databaseProvider === 'lowdb') return new DatabaseLowdb();
    throw Error(`Database provider ${databaseProvider} is not recognized`);
  }
}

module.exports = {DatabaseFactory};
