const {UNKNOWN_ENDPOINT, UNKNOWN_ERROR} = require('../enums/errors');

/**
 * Return middleware that handle exceptions.
 * Dispose to the first middleware.
 *
 * @return {function} Middleware.
 */
function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();

      // Respond 404 Not Found for unhandled request
      if (!ctx.body && (!ctx.status || ctx.status === 404)) {
        ctx.res.notFound(UNKNOWN_ENDPOINT.code, UNKNOWN_ENDPOINT.message);
      }
    } catch (err) {
      ctx.res.internalServerError(UNKNOWN_ERROR.code, UNKNOWN_ERROR.message);
      // Recommended for centralized error reporting,
      // retaining the default behaviour in Koa
      ctx.app.emit('error', err, ctx);
    }
  };
}

exports.errorHandler = errorHandler;
