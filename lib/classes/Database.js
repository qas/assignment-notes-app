/**
 * @class Database
 */
class Database {
  /**
   * @constructor
   */
  constructor() {
    this.connected = false;
  }

  /**
   * @name setName
   * @param {*} val
   * @return {this}
   */
  setName(val) {
    this.name = val;
    return this;
  }

  /**
   * @name setType
   * @param {*} val
   * @return {this}
   */
  setType(val) {
    this.type = val;
    return this;
  }

  /**
   * @name getDB
   * @param {*} val
   * @return {this}
   */
  getDB() {
    return this.db;
  }
}

module.exports = {Database};
