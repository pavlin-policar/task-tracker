
export const API_URL = 'http://localhost:3000/api/v1';

/**
 * The primary job of `api.*` functions is to map the API data to a localized
 * application format.
 *
 * We do this because we want to be able to switch the backend API with anything
 * in our particular case, having mongodb return `_id` as an identifier is very
 * annoying, and switching over to a SQL backend would require changing `_id` to
 * `id` everywhere. So normalizing the response to fix such things seems like a
 * better alternative.
 */

const idMapping = {
  _id: 'id',
};

/**
 * Todos
 */
const TODOS_URL = `${API_URL}/todos`;
const todoMapping = idMapping;


/**
 * Exports
 */
export const URLS = {
  TODOS_URL,
};
export const mappings = {
  [URLS.TODOS_URL]: todoMapping,
};
