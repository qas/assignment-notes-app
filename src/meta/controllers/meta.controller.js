const {getHealth} = require('../services/meta.service');

const health = (App, data) => {
  return getHealth();
};

exports.health = health;
