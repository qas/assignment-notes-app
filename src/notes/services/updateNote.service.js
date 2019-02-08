const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const updateNote = (App, {res, body: {query, changes}}) => {
  const repo = new NotesRepository(App);

  if (!isEmpty(query) &&
      !isEmpty(changes) && !isEmpty(repo.update(query, changes))) {
    return res.noContent();
  }

  res.badRequest();
};

module.exports = updateNote;
