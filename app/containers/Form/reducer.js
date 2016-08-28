import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
} from './constants';


const fields = (state = Map(), action) => {
  const { type, payload } = action;
  const { component } = payload;
  switch (type) {
    case ATTACH_TO_FORM:
      if (component.props.name) {
        return state.set(component.props.name, component);
      }
      return state;
    case DETACH_FROM_FORM:
      if (component.props.name) {
        return state.remove(component.props.name);
      }
      return state;
    default:
      return state;
  }
};

const values = (state = Map(), action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE:
      return state.set(payload.name, payload.value);
    default:
      return state;
  }
};

const form = combineReducers({
  fields,
  values,
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
      return state.set(payload.id, form(state.get(payload.id), action));
    default:
      return state;
  }
};

export default forms;
