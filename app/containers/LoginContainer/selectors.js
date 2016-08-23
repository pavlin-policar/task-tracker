import { createSelector } from 'reselect';

/**
 * Direct selector to the loginContainer state domain
 */
export const getLoginContainerDomain = () => state => state.get('loginContainer');

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
