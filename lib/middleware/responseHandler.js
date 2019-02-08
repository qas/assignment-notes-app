const {STATUS_CODES} = require('../enums/responses');

/**
 * @name responseHandler
 * @return {*}
 */
function responseHandler() {
  return async (ctx, next) => {
    ctx.res.statusCodes = STATUS_CODES;
    ctx.statusCodes = ctx.res.statusCodes;

    ctx.res.success = (data, message) => {
      ctx.status = ctx.status < 400 ? ctx.status : STATUS_CODES.OK;
      ctx.body = {status: 'success', data, message};
    };

    ctx.res.fail = (code, message, data) => {
      ctx.status = ctx.status >= 400 && ctx.status < 500 ?
          ctx.status :
          STATUS_CODES.BAD_REQUEST;
      ctx.body = {status: 'fail', code, data, message};
    };

    ctx.res.error = (code, message, data) => {
      ctx.status =
          ctx.status < 500 ? STATUS_CODES.INTERNAL_SERVER_ERROR : ctx.status;
      ctx.body = {status: 'error', code, data, message};
    };

    ctx.res.ok = (data, message) => {
      ctx.status = STATUS_CODES.OK;
      ctx.res.success(data, message);
    };

    ctx.res.created = (data, message) => {
      ctx.status = STATUS_CODES.CREATED;
      ctx.res.success(data, message);
    };

    ctx.res.accepted = (data, message) => {
      ctx.status = STATUS_CODES.ACCEPTED;
      ctx.res.success(data, message);
    };

    ctx.res.noContent = (data, message) => {
      ctx.status = STATUS_CODES.NO_CONTENT;
      ctx.res.success(data, message);
    };

    ctx.res.badRequest = (code, message, data) => {
      ctx.status = STATUS_CODES.BAD_REQUEST;
      ctx.res.fail(code, message, data);
    };

    ctx.res.forbidden = (code, message, data) => {
      ctx.status = STATUS_CODES.FORBIDDEN;
      ctx.res.fail(code, message, data);
    };

    ctx.res.notFound = (code, message, data) => {
      ctx.status = STATUS_CODES.NOT_FOUND;
      ctx.res.fail(code, message, data);
    };

    ctx.res.methodNotAllowed = (code, message, data) => {
      ctx.status = STATUS_CODES.METHOD_NOT_ALLOWED;
      ctx.res.fail(code, message, data);
    };

    ctx.res.requestTimeout = (code, message, data) => {
      ctx.status = STATUS_CODES.REQUEST_TIMEOUT;
      ctx.res.fail(code, message, data);
    };

    ctx.res.unprocessableEntity = (code, message, data) => {
      ctx.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
      ctx.res.fail(code, message, data);
    };

    ctx.res.internalServerError = (code, message, data) => {
      ctx.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
      ctx.res.error(code, message, data);
    };

    ctx.res.notImplemented = (code, message, data) => {
      ctx.status = STATUS_CODES.NOT_IMPLEMENTED;
      ctx.res.error(code, message, data);
    };

    ctx.res.badGateway = (code, message, data) => {
      ctx.status = STATUS_CODES.BAD_GATEWAY;
      ctx.res.error(code, message, data);
    };

    ctx.res.serviceUnavailable = (code, message, data) => {
      ctx.status = STATUS_CODES.SERVICE_UNAVAILABLE;
      ctx.res.error(code, message, data);
    };

    ctx.res.gatewayTimeOut = (code, message, data) => {
      ctx.status = STATUS_CODES.GATEWAY_TIME_OUT;
      ctx.res.error(code, message, data);
    };
    await next();
  };
}

exports.responseHandler = responseHandler;
