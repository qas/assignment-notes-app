const {name, version} = require('../../../package.json');

const getHealth = () => ({
  name,
  version,
});

exports.getHealth = getHealth;
