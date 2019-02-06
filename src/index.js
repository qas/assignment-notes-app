const config = require('../config');
const {AppFactory} = require('../lib/classes/AppFactory');
const {router} = require('./router');

/** Instances */
const App = AppFactory.getAppInstance('swagger');

/** Configure app */
App.setPort(config.app.PORT);
App.setRoutes(router.routes);

/** Start app */
App.initialize();

/** Handle exceptions */
process.on('unhandledRejection', (err) => {
  App.logger.error(err, {msg: 'unhandledRejection. Process exiting.'});
});
process.on('SIGINT', async () => {
  App.logger.error('SIGINT error. Process exiting.');
  await App.shutdown();
  process.exit();
});

/** Expose app */
module.exports = {App};
