const swagger = require('swagger2');

// TODO file not in use

/**
 * Swagger API validation middleware
 *
 * @name validationHandler
 * @param {*} document
 * @return {Function} Middleware.
 */
const validationHandler = (document) => {
  const compiled = swagger.compileDocument(document);
  const basePath = (document.basePath || '')
    + ((document.basePath || '').endsWith('/') ? '' : '/');

  return async (ctx, next) => {
    if (document.basePath !== undefined && !ctx.path.startsWith(basePath)) {
      // not a path that we care about
      await next();
      return;
    }

    const compiledPath = compiled(ctx.path);
    if (compiledPath === undefined) {
      // if there is no matching path found, return 404 (not found)
      ctx.res.notFound();
      return;
    }

    // check the request matches the Swagger schema
    const validationErrors =
        swagger.validateRequest(compiledPath, ctx.method,
            ctx.request.query,
            ctx.request.body,
            ctx.request.headers);

    if (validationErrors === undefined) {
      // operation not defined, return 405 (method not allowed)
      if (ctx.method !== 'OPTIONS') {
        ctx.res.methodNotAllowed();
      }
      return;
    }

    if (validationErrors.length > 0) {
      ctx.res.badRequest('SWAGGER_REQUEST_VALIDATION_FAILED', {
        errors: validationErrors});
      return;
    }

    await next();

    const error = swagger.validateResponse(compiledPath, ctx.method,
        ctx.status, ctx.body);

    if (error) {
      error.where = 'response';
      ctx.res.internalServerError('SWAGGER_RESPONSE_VALIDATION_FAILED', {
        errors: [error]});
    }
  };
};

exports.validationHandler = validationHandler;
