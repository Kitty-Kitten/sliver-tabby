import { BASE_HTTP_CODE, ERROR_HTTP_CODE } from '../../model/code';
import { IHelper } from '../../typings/app';

const validateRequest = function (
  this: IHelper,
  rule: any,
  data?: any,
): boolean {
  const { ctx } = this;
  let isValid = false;

  try {
    ctx.validate(rule, data);
    isValid = true;
  } catch (error) {
    ctx.logger.error(error);
    ctx.sendErrorResponse(
      BASE_HTTP_CODE.PARAM_ERROR,
      ERROR_HTTP_CODE.PARAM_INVALID,
    );
  }

  return isValid;
};

export default {
  validateRequest,
};
