import { createFormSubmitAction } from 'containers/Form/createFormActions';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from 'containers/Authentication/constants';
import { register as registerAction } from 'containers/Authentication/actions';


export const register = createFormSubmitAction(
  registerAction,
  [REGISTRATION_SUCCESS, REGISTRATION_FAILURE]
);
