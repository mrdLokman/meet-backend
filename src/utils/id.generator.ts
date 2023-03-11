import { customAlphabet } from 'nanoid';

/**
   * Generate a random ID with a specific prefix (id_ is the default prefix)
   *
   * Pass a length 0 string to generate a random ID without the separator _
   * @param prefix default is 'id'
   * @returns {string}
   */
export function generateId(prefix = 'id'): string {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 11);
  const id = nanoid();
  return prefix.length ? `${prefix}_${id}` : id;
}