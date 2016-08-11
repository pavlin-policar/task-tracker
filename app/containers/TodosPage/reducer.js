import { handleActions } from 'redux-actions';
import { List, OrderedMap, Record } from 'immutable';
import { combineReducers } from 'redux-immutable';
import _ from 'lodash';

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
  deleted: false,
});

/*
 * Todos reducer
 */

const todos = handleActions({
  [constants.FETCH_TODOS_SUCCESS](state, { payload: { result } }) {
    return state.merge(result);
  },
  [constants.CREATE_TODO_REQUEST](state, { payload: { result } }) {
    return state.push(result);
  },
  [constants.DELETE_TODO_SUCCESS](state, { payload }) {
    return state.filter(id => id.localeCompare(payload) !== 0);
  },
}, List());

const todosById = handleActions({
  // Fetch all todos
  [constants.FETCH_TODOS_SUCCESS](state, { payload: { entities } }) {
    return state.merge(_.mapValues(entities.todos, todo => new Todo(todo)));
  },
  // Create todo
  [constants.CREATE_TODO_REQUEST](state, { payload: { entities, result } }) {
    return state.set(
      result,
      new Todo({ ...entities.todos[result], dirty: true })
    );
  },
  [constants.CREATE_TODO_SUCCESS](state, { payload: { entities, result } }) {
    return state
      .mergeIn([result], new Todo(entities.todos[result]))
      .setIn([result, 'dirty'], false);
  },
  // Delete todo
  [constants.DELETE_TODO_REQUEST](state, { payload }) {
    return state.setIn([payload, 'deleted'], true);
  },
  [constants.DELETE_TODO_SUCCESS](state, { payload }) {
    return state.delete(payload);
  },
  [constants.DELETE_TODO_FAILURE](state, { payload }) {
    return state.setIn([payload, 'deleted'], false);
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
