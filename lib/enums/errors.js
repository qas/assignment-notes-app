/**
 * Client Failures
 */
/**
 * @enum
 * @name UNKNOWN_ENDPOINT
 * @type {string}
 */
const UNKNOWN_ENDPOINT = Object.freeze({
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.',
});

/**
 * @enum
 * @name INVALID_REQUEST
 * @type {string}
 */
const INVALID_REQUEST = Object.freeze({
  code: 'INVALID_REQUEST',
  message: 'The request has invalid parameters.',
});

/**
 * Server Errors
 */
/**
 * @enum
 * @name INTERNAL_ERROR
 * @type {string}
 */
const INTERNAL_ERROR = Object.freeze({
  code: 'INTERNAL_ERROR',
  message: 'The server encountered an internal error.',
});

/**
 * @enum
 * @name UNKNOWN_ERROR
 * @type {string}
 */
const UNKNOWN_ERROR = Object.freeze({
  code: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.',
});

export {
  UNKNOWN_ENDPOINT,
  INVALID_REQUEST,
  INTERNAL_ERROR,
  UNKNOWN_ERROR,
};
