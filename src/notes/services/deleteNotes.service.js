const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const deleteNotes = (App, {res, body, id}) => {
  const repo = new NotesRepository(App);
  const ids = body.ids;

  if (!isEmpty(ids) && repo.remove(ids) === true ||
    !isEmpty(id) && !isEmpty(repo.remove(id))) {
    return res.noContent();
  }

  res.badRequest();
};

module.exports = deleteNotes;
