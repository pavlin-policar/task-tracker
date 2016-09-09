import { Record } from 'immutable';
import { handleActions } from 'redux-actions';

import * as constants from './constants';


/*
 * Authentication reducer
 */
export const ROLES = {
  GUEST: 10,
  NORMAL: 20,
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
});

const authReducer = handleActions({
  [constants.LOGIN_REQUEST](state) {
    return state;
  },
}, new Auth());

export default authReducer;
