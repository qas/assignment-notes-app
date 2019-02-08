const {isEmpty} = require('../../../lib/utils/utils');

// TODO import and use models for validation

/**
 * @class NotesRepository
 */
class NotesRepository {
  /**
   * @constructor
   * @param {*} App
   */
  constructor({databases}) {
    this.name = 'notes';
    this.collection = databases.primary.db.get(this.name);
  }

  /**
   * @name find
   * @param {*} payload
   * @return {*}
   */
  find(payload) {
    return !isEmpty(payload)
      ? this.collection.find(payload).value()
      : this.collection.value();
  }

  /**
   * @name search
   * @param {*} term
   * @return {*}
   */
  search(term) {
    return this.collection.value().filter((note) => note.body.includes(term));
  }

  /**
   * @name insert
   * @param {*} notes
   * @return {*}
   */
  insert(notes) {
    const defaultNote = {createdTimestamp: Date.now()};

    if (Array.isArray(notes)) {
      let insertedOne = false;
      for (const note of notes) {
        const doc = this.collection.insert({...note, ...defaultNote}).write();
        if (!insertedOne && !isEmpty(doc)) insertedOne = true;
      }
      return insertedOne;
    } else {
      return this.collection.insert({...notes, ...defaultNote}).write();
    }
  }

  /**
   * @name updateOne
   * @param {*} note
   * @return {*}
   */
  updateOne({id, body}) {
    return this.collection.find({id}).assign({body}).write();
  }

  /**
   * @name remove
   * @param {*} payload
   * @return {*}
   */
  remove(payload) {
    if (Array.isArray(payload)) {
      let removedOne = false;
      for (const id of payload) {
        const doc = this.collection.remove({id}).write();
        if (!removedOne && !isEmpty(doc)) removedOne = true;
      }
      return removedOne;
    } else {
      return this.collection.remove({id: payload}).write();
    }
  }
}

exports.NotesRepository = NotesRepository;
