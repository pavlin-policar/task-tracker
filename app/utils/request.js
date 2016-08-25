
import 'whatwg-fetch';
import { invert, forIn } from 'lodash';

import { mappings } from 'api';

/**
 * Parses the JSON returned by a network request.
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  const formatData = (data) => ({
    response: {
      status: response.status,
      statusText: response.statusText,
    },
    [response.status >= 400 ? 'error' : 'data']: data,
  });

  const contentLength = response.headers.get('Content-Length');
  if (contentLength !== null && contentLength !== undefined) {
    return response.json().then((data) => formatData(data));
  }
  return Promise.resolve(formatData({}));
}

/**
 * Create a map handler function.
 *
 * @return {function}
 *   fn :: invertMap(bool) -> URL(string) -> obj -> mappedObj
 */
export const createMapHandler = (mappingList) => (invertMap) => (url, response) => {
  // The function that handles a single instance of object type
  const handleSingle = (instance) => {
    // Check that the url group has a defined mapping
    if (mappingList[url]) {
      const mapping = invertMap ? invert(mappingList[url]) : mappingList[url];
      const newObj = {};
      forIn(instance, (value, key) => {
        if (mapping[key]) {
          newObj[mapping[key]] = value;
        } else {
          newObj[key] = value;
        }
      });
      return newObj;
    }
    return instance;
  };

  // If the data field was not specified, simply return the data
  if (!response.data) {
    return response;
  }

  const { data: obj } = response;
  let data;
  if (Array.isArray(obj)) {
    data = obj.map(handleSingle);
  } else {
    data = handleSingle(obj);
  }

  return { ...response, data };
};

const mapFromResponse = createMapHandler(mappings)(false);
const mapFromRequest = createMapHandler(mappings)(true);

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const reqOptions = { ...headers, ...options };
  // If we are sending a body with the request
  if (options.body) {
    // Check if we need to map the request body.
    let body = mapFromRequest(url, options.body);
    // Convert body to JSON
    body = JSON.stringify(body);
    reqOptions.body = body;
  }

  return fetch(url, reqOptions)
    .then(parseJSON)
    .then(obj => mapFromResponse(url, obj))
    .catch((error) => ({ error }));
}
