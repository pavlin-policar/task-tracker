import { createSelector } from 'reselect';

/**
 * Direct selector to the loginForm state domain
 */
export const getLoginContainerDomain = () => state => state.get('loginForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginContainer
 */

export const getLoginContainer = () => createSelector(
  getLoginContainerDomain(),
  (substate) => substate.toJS()
);
export default getLoginContainer;
