import { combineReducers } from 'redux-immutable';
import { Map, List } from 'immutable';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
} from './constants';


const values = (state = Map(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACH_TO_FORM:
      return state.set(payload.component.props.name, '');
    case DETACH_FROM_FORM:
      return state.remove(payload.component.props.name);
    case CHANGE:
      return state.set(payload.name, payload.value);
    default:
      return state;
  }
};

const errors = (state = Map(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACH_TO_FORM:
      return state.set(payload.component.props.name, List());
    case DETACH_FROM_FORM:
      return state.remove(payload.component.props.name);
    case CHANGE:
    default:
      return state;
  }
};

const form = combineReducers({
  values,
  errors,
});

const forms = (state = Map(), action) => {
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
