const {AppFactory} = require('../lib/classes/AppFactory');
const {metaRoutes} = require('./meta/meta.module');
const {notesRoutes} = require('./notes/notes.module');

/** Instances */
const App = AppFactory.getAppInstance('swagger');

/** Routes */
const routes = [
  ...metaRoutes,
  ...notesRoutes];

const startApp = async () => {
  /** Init app */
  await App.initialize();

  /** Configure app */
  App.setRoutes(routes);

  /** Start app */
  const app = await App.start();

  /** Handle exceptions */
  process.on('unhandledRejection', (err) => {
    App.logger.error(err, {msg: 'unhandledRejection. Process exiting.'});
  });
  process.on('SIGINT', async () => {
    App.logger.error('SIGINT error. Process exiting.');
    await App.shutdown();
    process.exit();
  });

  return app;
};

if (require.main === module) {
  startApp();
}


exports.startApp = startApp;
