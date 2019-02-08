const {findNotes} = require('./controllers/notes.controller');
const {createNotes} = require('./controllers/notes.controller');
const {updateNotes} = require('./controllers/notes.controller');
const {deleteNotes} = require('./controllers/notes.controller');
const {Route} = require('../../lib/classes/Route');

const routes = [];
let route = null;

/**
 * Find note(s)
 * @route GET /v1/notes
 */
route = new Route();
route.setMethod('GET');
route.setPath('/notes');
route.setController(findNotes);
routes.push(route);

/**
 * Create note(s)
 * @route POST /v1/notes
 */
route = new Route();
route.setMethod('POST');
route.setPath('/notes');
route.setController(createNotes);
routes.push(route);

/**
 * Update note(s)
 * @route PUT /v1/notes
 */
route = new Route();
route.setMethod('PUT');
route.setPath('/notes');
route.setController(updateNotes);
routes.push(route);

/**
 * Delete note(s)
 * @route DELETE /v1/notes
 */
route = new Route();
route.setMethod('DELETE');
route.setPath('/notes');
route.setController(deleteNotes);
routes.push(route);

exports.notesRoutes = routes;
