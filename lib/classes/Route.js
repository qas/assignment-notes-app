/**
 * @class Route
 */
class Route {
  constructor() {

  }

  setPath(val) {
    this.path = val;
  }

  getPath() {
    return this.path;
  }

  setMethod(val) {
    this.method = val;
  }

  getMethod() {
    return this.method;
  }

  setEventNameListener(val) {
    this.eventNameListener = val;
  }

  getEventNameListener() {
    return this.eventNameListener;
  }
}

module.exports = {Route};
