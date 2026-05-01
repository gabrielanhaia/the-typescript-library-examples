// Before migration — JS with JSDoc.

/**
 * @param {Array<string>} names
 * @returns {Array<string>}
 */
export function dedupe(names) {
  return [...new Set(names)];
}
