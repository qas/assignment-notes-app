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
   * @name find
   * @param {*} term
   * @return {*}
   */
  search(term) {
    return this.collection.value().filter((i) => i.body.includes(term));
  }

  /**
   * @name insert
   * @param {*} notes
   * @return {*}
   */
  insert(notes) {
    const defaultNote = {createdTimestamp: Date.now()};

    if (Array.isArray(notes)) {
      for (const note of notes) {
        this.collection.insert({...note, ...defaultNote});
      }
      return true;
    } else {
      return this.collection.insert({...notes, ...defaultNote}).write();
    }
  }

  /**
   * @name update
   * @param {*} query
   * @param {*} changes
   * @return {*}
   */
  update(query, changes) {
    return this.collection.find(query).assign(changes).write();
  }

  /**
   * @name remove
   * @param {*} notes
   * @return {*}
   */
  remove(notes) {
    if (Array.isArray(notes)) {
      for (const note of notes) {
        this.collection.remove(note).write();
      }
      return true;
    } else {
      this.collection.remove(notes).write();
    }
  }
}

exports.NotesRepository = NotesRepository;
