const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {config} = require('../../config');

/**
 * @class RouterKoa
 */
class RouterKoa {
  /**
   * @constructor
   */
  constructor() {
    const router = new Router({
      prefix: config.PREFIX,
    });

    this.router = router;
    this.app = new Koa();
  }

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
   * @name start
   */
  async start() {
    await this.app.use(bodyParser());
    await this.app.use(this.router.routes());
    await this.app.use(this.router.allowedMethods());
    return this.app.listen(config.PORT, () => {
      this.App.logger.info(`\nKoa app is listening on port: ${config.PORT}`);
    });
  }

  /**
   * @name addRoute
   * @param {*} route
   */
  addRoute(route) {
    // eslint-disable-next-line no-unused-vars
    let routeMethod = 'get';

    if (route.getMethod() === 'GET') {
      routeMethod = 'get';
    }

    if (route.getMethod() === 'PUT') {
      routeMethod = 'put';
    }

    if (route.getMethod() === 'POST') {
      routeMethod = 'post';
    }

    if (route.getMethod() === 'DELETE') {
      routeMethod = 'delete';
    }

    this.router[routeMethod](route.getPath(), async (context, next) => {
      const params = context.params;
      const query = context.query;
      const headers = context.request.headers;
      const body = context.request.body;
      const res = context.request.res;

      const controller = route.getController();
      await controller(this.App, {...params, ...query, ...headers, body, res});

      return next();
    });
  }
}

exports.RouterKoa = RouterKoa;
