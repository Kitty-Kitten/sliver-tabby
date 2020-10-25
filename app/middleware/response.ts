import { Context } from 'egg';
import { IBaseError } from '../../model/errors';
import {
  BASE_HTTP_CODE,
  ERROR_HTTP_CODE,
  HTTP_CODE_MSG,
} from '../../model/code';

const sendSuccessResponse = function (this: Context, body: any) {
  const code = BASE_HTTP_CODE.SUCCESS;

  this.body = {
    code,
    message: HTTP_CODE_MSG[code],
    data: body,
  };
};

const sendErrorResponse = function (
  this: Context,
  error: IBaseError | BASE_HTTP_CODE,
  errorCode?: ERROR_HTTP_CODE,
) {
  let code = error;
  let message = '';

  if (typeof error === 'number') {
    message = HTTP_CODE_MSG[code as BASE_HTTP_CODE];
  } else {
    code = error.code;
    message = error.message;
  }

  this.status = code as BASE_HTTP_CODE;
  this.body = {
    code: errorCode || BASE_HTTP_CODE.UNKNOWN,
    message,
  };
};

const capturedErrorHandler = (ctx: Context, error: IBaseError) => {
  if (error.code) {
    ctx.sendErrorResponse(error);
  } else {
    const defaultCode = BASE_HTTP_CODE.UNKNOWN;

    ctx.sendErrorResponse({
      code: defaultCode,
      message: HTTP_CODE_MSG[defaultCode],
    });
  }
};

export default () => {
  return async (ctx: Context, next: () => {}) => {
    ctx.sendSuccessResponse = sendSuccessResponse.bind(ctx);
    ctx.sendErrorResponse = sendErrorResponse.bind(ctx);

    try {
      await next();
    } catch (error) {
      ctx.logger.error('error', error);
      capturedErrorHandler(ctx, error);
    }
  };
};
