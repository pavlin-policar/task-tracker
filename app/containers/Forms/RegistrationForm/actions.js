import createFormActions from 'containers/Form/createFormAction';
import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from 'containers/Authentication/constants';
import { register as registerAction } from 'containers/Authentication/actions';


export const register = createFormActions(
  registerAction,
  [REGISTRATION_SUCCESS, REGISTRATION_FAILURE]
);
