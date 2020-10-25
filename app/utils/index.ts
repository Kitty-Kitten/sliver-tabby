import { camelToUnderline } from './caseTransformer';
import { DEFAULT_INIT_PAGE, DEFAULT_PAGE_SIZE } from './constant';

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
