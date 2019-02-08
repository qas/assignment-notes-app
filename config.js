const dotenv = require('dotenv');
const pkgInfo = require('./package.json');

// Load environment variables from .env file
dotenv.config();

const devEnv = 'development';
const env = process.env.NODE_ENV || devEnv;
const configs = {
  base: {
    ENV: env,
    DEV: env === devEnv,
    // General
    NAME: process.env.APP_NAME || pkgInfo.name,
    TITLE: process.env.APP_TITLE || 'Notes',
    DESCRIPTION: process.env.APP_DESCRIPTION || 'Notes Application',
    // API
    PREFIX: process.env.APP_PREFIX || '/v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    PROTOCOL: process.env.APP_PROTOCOL || 'http',
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.APP_PORT || 7070,
    TRUST_PROXY: process.env.APP_TRUST_PROXY || false,
    // Database
    DATABASE_TYPE: process.env.DATABASE_TYPE || 'lowdb',
    DATABASE_HOST: process.env.DATABASE_HOST || '.data/documents.json',
    DATABASE_NAME: process.env.DATABASE_NAME || 'main',
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
};

exports.config = Object.freeze({...configs.base, ...configs[env]});
