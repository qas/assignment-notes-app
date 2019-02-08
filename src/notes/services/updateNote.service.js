const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const updateNote = (App, {res, body, id}) => {
  const repo = new NotesRepository(App);
  const query = body || {};
  query.id = id;

  if (!isEmpty(query) && !isEmpty(repo.updateOne(query))) {
    return res.noContent();
  }

  res.badRequest();
};

module.exports = updateNote;
