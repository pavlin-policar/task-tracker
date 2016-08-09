import { handleActions } from 'redux-actions';
import { List, OrderedMap, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';

import * as constants from './constants';

/**
 * Data types
 */
const Todo = Record({
  id: null,
  text: '',
  completed: false,
  createdAt: null,
  modifiedAt: null,
  dirty: false,
  synced: false,
});

/*
 * Todos reducer
 */

const todos = handleActions({
  [constants.CREATE_TODO_REQUEST](state, { payload }) {
    return state.push(payload.result);
  },
}, List());

const todosById = handleActions({
  [constants.CREATE_TODO_REQUEST](state, { payload }) {
    return state.set(
      payload.result,
      new Todo(payload.entities.todos[payload.result])
    );
  },
  [constants.CREATE_TODO_SUCCESS](state, { payload }) {
    return state.setIn([payload.id, payload.synced], true);
  },
}, OrderedMap());

export default combineReducers({
  todos,
  todosById,
});
