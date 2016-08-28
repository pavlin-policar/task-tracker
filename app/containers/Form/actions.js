import { createAction } from 'redux-actions';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
  FOCUS,
  BLUR,
} from './constants';


export const registerForm = createAction(REGISTER_FORM);
export const unregisterForm = createAction(UNREGISTER_FORM);

export const attachToForm = createAction(ATTACH_TO_FORM);
export const detachFromForm = createAction(DETACH_FROM_FORM);

export const change = createAction(CHANGE, (id, name, value) => ({ id, name, value }));

export const focus = createAction(FOCUS, (id, name) => ({ id, name }));
export const blur = createAction(BLUR, (id, name) => ({ id, name }));
