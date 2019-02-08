const {health} = require('./controllers/meta.controller');
const {Route} = require('../../lib/classes/Route');

const routes = [];
let route = null;

/**
 * Health info
 * @route GET /v1/health
 */
route = new Route();
route.setMethod('GET');
route.setPath('/health');
route.setController(health);
routes.push(route);

exports.metaRoutes = routes;
