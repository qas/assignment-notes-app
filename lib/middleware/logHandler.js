const _ = require('../utils/utils');

/**
 * @name reqSerializer
 * @param {*} ctx
 * @return {*}
 */
function reqSerializer(ctx) {
  return {
    method: ctx.method,
    path: ctx.path,
    url: ctx.url,
    headers: ctx.headers,
    protocol: ctx.protocol,
    ip: ctx.ip,
    query: ctx.query,
  };
}

/**
 * @name reqSerializer
 * @param {*} ctx
 * @return {*}
 */
function resBodySerializer({
  status = null,
  code = null,
  message = null,
} = {}) {
  const body = {status, message, code: null};
  if (code) {
    body.code = code;
  }
  return body;
}

/**
 * @name reqSerializer
 * @param {*} ctx
 * @return {*}
 */
function resSerializer(ctx) {
  return {
    statusCode: ctx.status,
    responseTime: ctx.responseTime,
    type: ctx.type,
    headers: _.get(ctx, 'response.headers'),
    body: resBodySerializer(ctx.body),
  };
}

/**
 * Return middleware that attachs logger to context and
 * logs HTTP request/response.
 *
 * @param {Object} options={} - Optional configuration.
 * @param {Object} options.logger - Logger instance of bunyan.
 * @return {function} Koa middleware.
 */
function logHandler(options = {
  logger: {},
}) {
  const {logger} = options;

  if (!_.isObject(logger) || _.isNil(logger.constructor)) {
    throw new TypeError('Logger required');
  }

  return async (ctx, next) => {
    const startTime = new Date();
    ctx.log = {
      log: _.get(logger, 'log'),
      info: _.get(logger, 'info'),
      error: _.get(logger, 'error'),
      warn: _.get(logger, 'warn'),
    };

    ctx.log.info(
        {reqId: ctx.reqId, req: reqSerializer(ctx), event: 'request'},
        `Request start for id: ${ctx.reqId}`,
    );

    try {
      await next();
    } catch (err) {
      ctx.log.error(
          {reqId: ctx.reqId, err, event: 'error'},
          `Unhandled exception occured on the request: ${ctx.reqId}`,
      );
      throw err;
    }

    ctx.responseTime = +new Date() - +startTime;
    ctx.log.info(
        {
          reqId: ctx.reqId,
          req: ctx,
          res: resSerializer(ctx),
          event: 'response',
        },
        `Request successfully completed for id: ${ctx.reqId}`,
    );
  };
}

exports.logHandler = logHandler;
