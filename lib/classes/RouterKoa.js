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

    this.router = router;

    const api = router({
      prefix: config.PREFIX,
    });

    api.extend(koaRouter);

    this.app = new Koa();
    this.app.use(koaRouter.middleware());
    this.app.use(api.middleware());

    await this.app.listen(config.PORT, () => {
      this.App.logger.info(`\nKoa app is listening on port: ${config.PORT}`);
    });
  }

  /**
   * @name addRoute
   * @param {*} route
   */
  addRoute(route) {
    let routeMethod = 'get';

    if (route.getMethod() == 'GET') {
      routeMethod = 'get';
    }

    if (route.getMethod() == 'PUT') {
      routeMethod = 'put';
    }

    if (route.getMethod() == 'POST') {
      routeMethod = 'post';
    }

    this.router[routeMethod](route.getPath(), async (ctx, next) => {
      const params = ctx.params;
      const query = ctx.query;
      const headers = ctx.request.headers;
      const data = {...params, ...query, ...headers};

      ctx.body = 'Hello world!';

      return next();
    });
  }
}

exports.RouterKoa = RouterKoa;
