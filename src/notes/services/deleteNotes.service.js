const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const deleteNotes = (App, {res, body}) => {
  const repo = new NotesRepository(App);

  // delete multiple notes
  if (Array.isArray(body) && repo.remove(body)) {
    return res.noContent();
  } else if (!isEmpty(body) && !isEmpty(repo.remove(body))) {
    return res.noContent();
  }

  res.badRequest();
};

module.exports = deleteNotes;
