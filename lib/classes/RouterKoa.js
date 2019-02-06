const Koa = require('koa');
const router = require('koa-better-router');
const {config} = require('../../config');

/**
 * @class RouterKoa
 */
class RouterKoa {
  /**
   * @name setApp
   * @param {*} val
   * @return {this}
   */
  setApp(val) {
    this.App = val;
    return this;
  }

  /**
   * @name initialize
   * @return {this}
   */
  getApp() {
    return this.App;
  }

  /**
   * @name initialize
   */
  async initialize() {
    const koaRouter = router().loadMethods();

    this.koaRouter = router;

    const api = router({
      prefix: config.PREFIX,
    });

    api.extend(koaRouter);

    const app = new Koa();

    app.use(koaRouter.middleware());
    app.use(api.middleware());

    const port = config.PORT;

    await app.listen(port, () => {
      this.App.logger.info(`\nKoa app is listening on port: ${port}`);
    });
  }

  /**
   * @name addRoute
   * @param {*} route
   */
  addRoute(route) {
  }
}

exports.RouterKoa = RouterKoa;
