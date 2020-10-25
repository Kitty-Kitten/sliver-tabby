/**
 * dash-string to dashString or DashString
 * @param source - string
 * @param toCamelCase - boolean
 * @return {String} result
 */
export const dashToCamel = (source: string, toCamelCase = false): string => {
  const result = source
    .toLowerCase()
    .replace(/-([a-z])/g, (_matched, capture) => capture.toUpperCase());

  if (toCamelCase) {
    return result.replace(/^([a-z])/, (m) => m.toUpperCase());
  }

  return result;
};

/**
 * dash-string to dash_string
 * @param source - string
 * @return {String} result
 */
export const dashToUnderline = (source: string): string =>
  source.replace(/-/g, '_');

/**
 * dash-string to DASH_STRING
 * @param source - string
 * @return {String} result
 */
export const dashToConst = (source: string): string =>
  dashToUnderline(source).toUpperCase();

/**
 * underline_string to underline-string
 * @param source - string
 * @return {String} result
 */
export const underlineToDash = (source: string): string =>
  source.replace(/_/g, '-');

/**
 * underline_string to underlineString or UnderlineString
 * @param source - string
 * @param toCamelCase - boolean
 * @return {String} result
 */
export const underlineToCamel = (
  source: string,
  toCamelCase = false,
): string => {
  const result = source
    .toLowerCase()
    .replace(/_([a-z])/g, (_matched, capture) => capture.toUpperCase());

  if (toCamelCase) {
    return result.replace(/^[a-z]/, (m) => m.toUpperCase());
  }

  return result;
};

/**
 * camelString or CamelString to camel-string
 * @param source - string
 * @return {String} result
 */
export const camelToDash = (source: string): string => {
  return source
    .replace(/\B([A-Z])/g, (m) => `-${m.toLowerCase()}`)
    .toLowerCase();
};

/**
 * camelString or CamelString to camel_string
 * @param source - string
 * @return {String} result
 */
export const camelToUnderline = (source: string): string => {
  return source
    .replace(/\B([A-Z])/g, (m) => `_${m.toLowerCase()}`)
    .toLowerCase();
};

/**
 * camelString or CamelString to CAMEL_STRING
 * @param source - string
 * @return {String} result
 */
export const camelToConst = (source: string): string =>
  camelToUnderline(source).toUpperCase();
