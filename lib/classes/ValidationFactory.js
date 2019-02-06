const {ValidationJSONSchema} = require('./ValidationJSONSchema');

/**
 * @class ValidationFactory
 */
class ValidationFactory {
  /**
   * @name getLogInstance
   * @param {*} validationProvider
   * @return {object} The validation provider.
   */
  static getValidationInstance(validationProvider) {
    if (validationProvider === 'json-schema') return new ValidationJSONSchema();
    throw Error(`Validation provider ${validationProvider} is not recognized`);
  }
}

module.exports = {ValidationFactory};
