import { createAction } from 'redux-actions';
import { v4 } from 'node-uuid';
import { normalize } from 'normalizr';

import { todo } from './schema';
import * as Constants from './constants';

/*
 * Todos actions
 */

export const toggleTodo = createAction(Constants.TOGGLE_TODO);

/**
 * Async actions
 */

// Fetch
export const fetchTodos = createAction(Constants.FETCH_TODOS_REQUEST);
export const receiveTodos = createAction(Constants.FETCH_TODOS_SUCCESS);
export const failedFetchingTodos = createAction(Constants.FETCH_TODOS_FAILURE);

// Create
export const createTodo = createAction(
  Constants.CREATE_TODO_REQUEST,
  ({ text }) => normalize({ id: v4(), text, created: new Date() }, todo)
);
export const receiveCreatedTodo = createAction(Constants.CREATE_TODO_SUCCESS);
export const failedCreatingTodo = createAction(Constants.CREATE_TODO_FAILURE);

// Update
export const updateTodo = createAction(Constants.UPDATE_TODO_REQUEST);
export const receiveUpdatedTodo = createAction(Constants.UPDATE_TODO_SUCCESS);
export const failedUpdatingTodo = createAction(Constants.UPDATE_TODO_FAILURE);

// Delete
export const deleteTodo = createAction(Constants.DELETE_TODO_REQUEST);
export const receiveDeletedTodo = createAction(Constants.DELETE_TODO_SUCCESS);
export const failedDeletingTodo = createAction(Constants.DELETE_TODO_FAILURE);
