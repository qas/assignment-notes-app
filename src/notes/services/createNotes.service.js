const {config} = require('../../../config');
const {isEmpty} = require('../../../lib/utils/utils');
const {NotesRepository} = require('../repositories/notes.repository');

const createNotes = (App, {res, body}) => {
  const repo = new NotesRepository(App);

  // create multiple notes
  if (Array.isArray(body) && repo.insert(body)) {
    return res.created();
  } else if (!isEmpty(body)) { // create single note
    const doc = repo.insert(body);

    if (!isEmpty(doc)) {
      const docSelfEndpoint =
        `${config.PROTOCOL}://${config.HOST}:${config.PORT}/v1/notes/${doc.id}`;
      const output = {
        links: [{
          'href': docSelfEndpoint,
          'rel': 'self',
        }, {
          'href': docSelfEndpoint,
          'rel': 'delete',
          'method': 'DELETE',
        }, {
          'href': docSelfEndpoint,
          'rel': 'replace',
          'method': 'PUT',
        }],
      };
      return res.created(output);
    }
  }

  res.badRequest();
};

module.exports = createNotes;
