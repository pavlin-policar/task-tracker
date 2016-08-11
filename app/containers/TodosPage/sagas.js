import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import _ from 'lodash';

import { URLS } from 'api';
import request from 'utils/request';
import {
  FETCH_TODOS_REQUEST,
  CREATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
} from './constants';
import {
  receiveTodos,
  failedFetchingTodos,
  receiveCreatedTodo,
  failedCreatingTodo,
  receiveDeletedTodo,
  failedDeletingTodo,
} from './actions';


/**
 * Fetch todos
 */
export function* fetchTodos() {
  const response = yield call(request, URLS.TODOS_URL);

  if (!_.has(response, 'error')) {
    yield put(receiveTodos(response.data));
  } else {
    yield put(failedFetchingTodos(response.error));
  }
}

function* getTodosWatcher() {
  yield* takeEvery(FETCH_TODOS_REQUEST, fetchTodos);
}

/**
 * Create todo
 */
export function* createTodo({ payload }) {
  const response = yield call(request, URLS.TODOS_URL, {
    method: 'POST',
    body: payload.entities.todos[payload.result],
  });

  if (!_.has(response, 'error')) {
    yield put(receiveCreatedTodo(response.data));
  } else {
    yield put(failedCreatingTodo(response.error));
  }
}

function* createTodoWatcher() {
  yield* takeEvery(CREATE_TODO_REQUEST, createTodo);
}

/**
 * Delete todo
 */
export function* deleteTodo({ payload }) {
  const response = yield call(request, `${URLS.TODOS_URL}/${payload}`, {
    method: 'DELETE',
  });

  if (!_.has(response, 'error')) {
    yield put(receiveDeletedTodo(payload));
  } else {
    yield put(failedDeletingTodo(payload));
  }
}

function* deleteTodoWatcher() {
  yield* takeEvery(DELETE_TODO_REQUEST, deleteTodo);
}

// All sagas to be loaded
export default [
  getTodosWatcher,
  createTodoWatcher,
  deleteTodoWatcher,
];
