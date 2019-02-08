const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const findNotes = (App, {res, body}) => {
  const repo = new NotesRepository(App);

  // search all notes by term
  if (!isEmpty(body) && body.term) {
    const docs = repo.search(body.term);
    if (!isEmpty(docs)) {
      return res.ok(docs);
    }
  } else { // find one or more notes by properties
    const docs = repo.find(body);
    if (!isEmpty(docs)) {
      return res.ok(docs);
    }
  }

  res.notFound();
};

module.exports = findNotes;
