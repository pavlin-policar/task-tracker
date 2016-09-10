import { createSelector } from 'reselect';

import { ROLES } from './reducer';

/**
 * Direct selector to the Authentication state domain
 */
export const getAuthenticationDomain = () => state => state.get('auth');

/**
 * Default selector used by Authentication
 */

export const getUser = () => createSelector(
  getAuthenticationDomain(),
  auth => auth.get('user')
);

export const getIsLoggedIn = () => createSelector(
  getUser(),
  user => user.get('role') !== ROLES.GUEST
);

export const getIntendedLocation = () => createSelector(
  getAuthenticationDomain(),
  auth => auth.get('intendedLocation')
);
