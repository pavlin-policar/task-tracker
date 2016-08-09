import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import request from 'utils/request';
import {
  FETCH_TODOS_REQUEST,
  CREATE_TODO_REQUEST,
} from './constants';
import {
  receiveTodos,
  failedFetchingTodos,
  receiveCreatedTodo,
  failedCreatingTodo,
} from './actions';


/**
 * Fetch todos
 */
export function* fetchTodos() {
  const requestURL = `http://localhost:3000/${'todos'}`;
  const response = yield call(request, requestURL);

  if (response.error === 'undefined' || response.error === null) {
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
  const requestURL = `http://localhost:3000/${'todos'}`;
  const response = yield call(request, requestURL, payload);

  if (response.error === 'undefined' || response.error === null) {
    yield put(receiveCreatedTodo(response.data));
  } else {
    yield put(failedCreatingTodo(response.error));
  }
}

function* createTodoWatcher() {
  yield* takeEvery(CREATE_TODO_REQUEST, createTodo);
}

// All sagas to be loaded
export default [
  getTodosWatcher,
  createTodoWatcher,
];
