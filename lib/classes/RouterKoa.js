const Koa = require('koa');
const Router = require('koa-better-router');
const Event = require('./Event');

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
  initialize() {
    const router = Router().loadMethods();

    this.koaRouter = router;

    const api = Router({
      prefix: '/api',
    });

    // add `router`'s routes to api router
    api.extend(router);

    const app = new Koa();

    app.use(router.middleware());
    app.use(api.middleware());

    const port = 3002;

    app.listen(port, () => {
      console.log(`\nKoa app is listening on port: ${port}`);
    });
  }


  /**
   * @name addRoute
   * @param {*} route
   */
  addRoute(route) {
    const self = this;

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

    this.koaRouter[routeMethod](route.getPath(), async (ctx, next) => {
      const params = ctx.params;
      const query = ctx.query;
      const headers = ctx.request.headers;

      let data = {};
      data = Object.assign(data, params);
      data = Object.assign(data, query);
      data = Object.assign(data, headers);

      let response = null;

      try {
        response = await new Event(self.getApp()).call(route.getEventNameListener(), data);
        // errors should come through the response as a json but just in case we still have a try catch here

        if (!response) {
          // developer wrote improper code if we reach here... errorJson.userDisplayableMessage should always exist
          // log special error here
          ctx.body = {
            'err': 'Internal Error Raw Code: 00',
          }; // dont display errorJson to users it has sensative data...we should ALWAYS have userDisplayableMesssage
        } else {
          if (response.data && response.data.error) {
            const errorJson = response.data;

            if (errorJson.userDisplayableMessage) {
              ctx.body = {
                'err': errorJson.userDisplayableMessage,
              };
            } else {
              // developer wrote improper code if we reach here... errorJson.userDisplayableMessage should always exist
              // log special error here
              ctx.body = {
                'err': 'Internal Error Raw Code: 01',
              }; // dont display errorJson to users it has sensative data...we should ALWAYS have userDisplayableMesssage
            }
          } else {
            // api endpoints more familiar with res variable instead of data but data makes sense back here. we'll just translate here
            ctx.body = `${JSON.stringify({'res': response.data})}`; // perfect code 200 type response UNLESS the json does not parse then errors will log here in full because we cannot tell the difference...at which point a dev should fix that particular code that passes it up that way
          }
        }
      } catch (errorJson) {
        // we shouldn't be hitting this otherwise we have an obvious developer error
        if (errorJson.userDisplayableMessage) {
          ctx.body = {
            'err': errorJson.userDisplayableMessage,
          };
        } else {
          // developer wrote improper code if we reach here... errorJson.userDisplayableMessage should always exist
          // log special error here
          ctx.body = {
            'err': 'Internal Error Raw Code: 02',
          };
        }
      }

      return next();
    });
  }
}

module.exports = {RouterKoa};
