import {
  createFormSubmitAction,
  createFormValidationAction,
} from 'containers/Form/createFormActions';

import {
  CHECK_EMAIL_EXISTS_SUCCESS,
  CHECK_EMAIL_EXISTS_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from 'containers/Authentication/constants';

import {
  register as registerAction,
  checkEmailExists as checkEmailExistsAction,
} from 'containers/Authentication/actions';


export const register = createFormSubmitAction(
  registerAction,
  [REGISTRATION_SUCCESS, REGISTRATION_FAILURE]
);

export const checkEmailExists = createFormValidationAction(
  checkEmailExistsAction,
  [CHECK_EMAIL_EXISTS_SUCCESS, CHECK_EMAIL_EXISTS_FAILURE]
);
