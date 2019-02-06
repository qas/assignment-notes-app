
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const {Database} = require('./Database');

/**
 * @class DatabaseLowdb
 */
class DatabaseLowdb extends Database {
  /**
   * @costructor
   */
  constructor() {
    super();
    this.setType('lowdb');
  }

  /**
   * @name connect
   * @param {*} val
   * @return {this}
   */
  connect() {
    this.db = low(this.adapter);
    return this;
  }

  /**
   * @name setAdapter
   * @param {*} val
   * @return {this}
   */
  setAdapter(val) {
    this.adapter = new FileSync(val);
    return this;
  }

  /**
   * @name getAdapter
   * @param {*} val
   * @return {this}
   */
  getAdapter(val) {
    return this.adapter;
  }
}

module.exports = {DatabaseLowdb};
