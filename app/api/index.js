
export const API_URL = 'http://localhost:3001/api/v1';

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
* Authentication
*/
const CHECK_USER_EXISTS = `${API_URL}/auth/checkuser`;
const REGISTRATION_URL = `${API_URL}/auth/register`;
const LOGIN_URL = `${API_URL}/auth/login`;

/**
 * Todos
 */
const TODOS_URL = `${API_URL}/todos`;
const todoMapping = idMapping;


/**
 * Exports
 */
export const URLS = {
  CHECK_USER_EXISTS,
  REGISTRATION_URL,
  LOGIN_URL,
  TODOS_URL,
};
export const mappings = {
  [URLS.TODOS_URL]: todoMapping,
};
