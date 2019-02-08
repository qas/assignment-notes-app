const {getHealth} = require('../services/meta.service');

/**
 * @controller health
 * @param {*} App
 * @param {*} data
 * @return {*}
 */
const health = (App, data) => {
  return getHealth();
};

exports.health = health;
