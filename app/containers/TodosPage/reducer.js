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
  [constants.FETCH_TODOS_SUCCESS](state, { payload }) {
    return state.merge(payload.result);
  },
  [constants.CREATE_TODO_REQUEST](state, { payload }) {
    return state.push(payload.result);
  },
}, List());

const todosById = handleActions({
  [constants.FETCH_TODOS_SUCCESS](state, { payload }) {
    return state.merge(payload.entities.todos);
  },
  [constants.CREATE_TODO_REQUEST](state, { payload }) {
    return state.set(
      payload.result,
      new Todo(payload.entities.todos[payload.result])
    );
  },
  [constants.CREATE_TODO_SUCCESS](state, { payload }) {
    const savedTodo = payload.entities.todos[payload.result];
    return state.setIn([savedTodo.id, 'synced'], true);
  },
}, OrderedMap());

const isLoading = (state = false, action) => {
  switch (action.type) {
    case constants.FETCH_TODOS_REQUEST:
      return true;
    case constants.FETCH_TODOS_SUCCESS:
    case constants.FETCH_TODOS_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  todos,
  todosById,
  isLoading,
});
