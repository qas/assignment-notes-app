const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const findNotes = (App, {res, body, id}) => {
  const repo = new NotesRepository(App);
  const query = body || {};

  if (id) query.id = id;

  // search all notes by term
  if (!isEmpty(query) && query.term) {
    const docs = repo.search(query.term);
    if (!isEmpty(docs)) {
      return res.ok(docs);
    }
  } else { // find one or more notes by properties
    const docs = repo.find(query);
    if (!isEmpty(docs)) {
      return res.ok(docs);
    }
  }

  res.notFound();
};

module.exports = findNotes;
