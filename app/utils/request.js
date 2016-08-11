
import 'whatwg-fetch';
import _ from 'lodash';

import { mappings } from 'api';

/**
 * Parses the JSON returned by a network request.
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.headers.get('Content-Length') !== null) {
    return response.json().catch(
      () => { throw new Error('Failed parsing response: Malformed JSON.'); }
    );
  }
  return response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Create a map handler function.
 *
 * @return {function}
 *   fn :: invertMap(bool) -> URL(string) -> obj -> mappedObj
 */
const createMapHandler = (mappingList) => (invertMap) => (url, obj) => {
  // The function that handles a single instance of object type
  const handleSingle = (instance) => {
    // Check that the url group has a defined mapping
    if (_.has(mappingList, url)) {
      const mapping = invertMap ? _.invert(mappingList[url]) : mappingList[url];
      const newObj = {};
      _.forIn(instance, (value, key) => {
        if (_.has(mapping, key)) {
          newObj[mapping[key]] = value;
        } else {
          newObj[key] = value;
        }
      });
      return newObj;
    }
    return instance;
  };

  if (Array.isArray(obj)) {
    return obj.map(handleSingle);
  }
  return handleSingle(obj);
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
  if (_.has(options, 'body')) {
    // Check if we need to map the request body.
    let body = mapFromRequest(url, options.body);
    // Convert body to JSON
    body = JSON.stringify(body);
    reqOptions.body = body;
  }

  return fetch(url, reqOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(obj => mapFromResponse(url, obj))
    .then((data) => ({ data }));
}
