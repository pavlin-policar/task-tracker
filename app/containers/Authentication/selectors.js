import { createSelector } from 'reselect';

/**
 * Direct selector to the Authentication state domain
 */
export const getLoginContainerDomain = () => state => state.get('authentication');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Authentication
 */

export const getLoginContainer = () => createSelector(
  getLoginContainerDomain(),
  (substate) => substate.toJS()
);
export default getLoginContainer;
