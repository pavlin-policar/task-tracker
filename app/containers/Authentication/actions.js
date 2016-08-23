import { createAction } from 'redux-actions';

import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  LOGOUT,
} from './constants';

/*
 * Authentication actions
 */

export const register = createAction(REGISTRATION_REQUEST);
export const registrationSuccess = createAction(REGISTRATION_SUCCESS);
export const registrationFailure = createAction(REGISTRATION_FAILURE);

export const login = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction(LOGIN_FAILURE);

export const resetPassword = createAction(PASSWORD_RESET_REQUEST);
export const resetPasswordSuccess = createAction(PASSWORD_RESET_SUCCESS);
export const resetPasswordFailure = createAction(PASSWORD_RESET_FAILURE);

export const logout = createAction(LOGOUT);
