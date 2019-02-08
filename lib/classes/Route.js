/**
 * @class Route
 */
class Route {
  /**
   * @name setPath
   * @param {*} val
   */
  setPath(val) {
    this.path = val;
  }

  /**
   * @name getPath
   * @return {this}
   */
  getPath() {
    return this.path;
  }

  /**
   * @name setMethod
   * @param {*} val
   */
  setMethod(val) {
    this.method = val;
  }

  /**
   * @name getMethod
   * @return {*}
   */
  getMethod() {
    return this.method;
  }

  /**
   * @name setController
   * @param {*} val
   */
  setController(val) {
    this.controller = val;
  }

  /**
   * @name getController
   * @return {*}
   */
  getController() {
    return this.controller;
  }
}

exports.Route = Route;
