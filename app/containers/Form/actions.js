import { createAction } from 'redux-actions';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
} from './constants';


export const registerForm = createAction(REGISTER_FORM);
export const unregisterForm = createAction(UNREGISTER_FORM);

export const attachToForm = createAction(ATTACH_TO_FORM);
export const detachFromForm = createAction(DETACH_FROM_FORM);

export const valueChanged = createAction(CHANGE);
