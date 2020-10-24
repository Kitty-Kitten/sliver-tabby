import { Context } from 'egg';
import { BASE_HTTP_CODE, ERROR_HTTP_CODE } from '../../model/code';
import { camelToUnderline } from './caseTransformer';
import { DEFAULT_INIT_PAGE, DEFAULT_PAGE_SIZE } from './constant';

/**
 * validate query/params of request
 * @param ctx - Context
 * @param rule - any
 * @param data - any
 * @return {Boolean} - isValid
 */
export const validateRequest = (
  ctx: Context,
  rule: any,
  data?: any,
): boolean => {
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

/**
 * extract and transform paging info
 * @param source - Record<string, any>
 */
export const transformPagingInfo = (source: Record<string, any>) => {
  const {
    page = DEFAULT_INIT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    ...ret
  } = source;

  return {
    ...ret,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };
};

/**
 * transform query key from camelCase to underline case
 * @param query - any
 */
export const processQuery = (query: any) => {
  const result = {};

  for (const key in query) {
    const val = query[key];

    result[camelToUnderline(key)] = Number(val) || val;
  }

  return result;
};
