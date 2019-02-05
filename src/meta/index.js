const swagger = require('../lib/swagger');

const options = {
  swaggerDefinition: {
    basePath: '/',
  },
  apis: [
    './*.js',
  ],
};

const spec = swagger(options);

