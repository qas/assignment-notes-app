const findNotesService = require('../services/findNotes.service');
const createNotesService = require('../services/createNotes.service');
const updateNoteService = require('../services/updateNote.service');
const deleteNotesService = require('../services/deleteNotes.service');

/**
 * @controller findNotes
 * @param {*} App
 * @param {*} data
 * @return {*}
 */
const findNotes = (App, data) => {
  return findNotesService(App, data);
};

/**
 * @controller createNotes
 * @param {*} App
 * @param {*} data
 * @return {*}
 */
const createNotes = (App, data) => {
  return createNotesService(App, data);
};

/**
 * @controller updateNotes
 * @param {*} App
 * @param {*} data
 * @return {*}
 */
const updateNote = (App, data) => {
  return updateNoteService(App, data);
};

/**
 * @controller deleteNotes
 * @param {*} App
 * @param {*} data
 * @return {*}
 */
const deleteNotes = (App, data) => {
  return deleteNotesService(App, data);
};

exports.findNotes = findNotes;
exports.createNotes = createNotes;
exports.updateNotes = updateNote;
exports.deleteNotes = deleteNotes;
