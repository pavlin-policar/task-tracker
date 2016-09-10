import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import * as constants from './constants';


/*
 * Authentication reducer
 */
export const ROLES = {
  GUEST: 10,
  USER: 20,
  ADMIN: 100,
};

export const User = Record({
  id: null,
  name: '',
  surname: '',
  email: '',
  birthday: '',
  lastLogin: null,
  lastSeen: null,
  role: ROLES.GUEST,
});

export const Auth = Record({
  user: new User(),
  intendedLocation: null,
});

const authReducer = handleActions({
  [constants.LOGIN_SUCCESS](state, action) {
    return state.set('user', new User(action.payload));
  },
  [constants.LOGOUT](state) {
    return state.set('user', new User());
  },
  [constants.REDIRECT_FROM_UNAUTHORIZED](state, { payload }) {
    return state.set('intendedLocation', payload.intendedLocation);
  },
  [constants.REDIRECT_TO_INTENDED](state) {
    return state.set('intendedLocation', null);
  },
}, new Auth());

export default authReducer;
