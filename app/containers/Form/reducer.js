import { Map, List, Record } from 'immutable';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
} from './constants';


/**
 * Record definitions
 */

export const Field = Record({
  value: '',
  errors: List(),
});
export const Form = Record({
  fields: Map(),
});

/**
 * Reducers
 */

export const field = (state = new Field(), action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE:
      return state.set('value', payload.value);
    default:
      return state;
  }
};

export const form = (state = new Form(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACH_TO_FORM:
      return state.setIn(['fields', payload.name], field(undefined, action));
    case DETACH_FROM_FORM:
      return state.removeIn(['fields', payload.name]);
    case CHANGE:
      return state.setIn(
        ['fields', payload.name],
        field(state.getIn(['fields', payload.name]), action)
      );
    default:
      return state;
  }
};

export const forms = (state = new Map(), action) => {
  const { type, payload } = action;
  switch (type) {
    // Register form in reducer
    case REGISTER_FORM:
      return state.set(payload, form(undefined, action));
    case UNREGISTER_FORM:
      return state.remove(payload);
    // For everything else, just pass down to form
    case ATTACH_TO_FORM:
    case DETACH_FROM_FORM:
    case CHANGE:
      return state.set(payload.id, form(state.get(payload.id), action));
    default:
      return state;
  }
};

export default forms;
