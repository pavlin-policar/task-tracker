import { createFormSubmitAction } from '@policar/react-redux-form';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from 'containers/Authentication/constants';

import { login as loginAction } from 'containers/Authentication/actions';


export const login = createFormSubmitAction(
  loginAction,
  [LOGIN_SUCCESS, LOGIN_FAILURE]
);
