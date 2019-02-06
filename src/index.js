const {AppFactory} = require('../lib/classes/AppFactory');
const {routes} = require('./routes');

/** Instances */
const App = AppFactory.getAppInstance('swagger');

/** Configure app */
App.setRoutes(routes);

/** Start app */
App.initialize();

/** Handle unknown exceptions */
process.on('unhandledRejection', (err) => {
  App.logger.error(err, {msg: 'unhandledRejection. Process exiting.'});
});
process.on('SIGINT', async () => {
  App.logger.error('SIGINT error. Process exiting.');
  await App.shutdown();
  process.exit();
});

/** Expose app */
exports.App = App;
