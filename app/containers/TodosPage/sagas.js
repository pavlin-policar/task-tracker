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


const BASE_URL = 'http://localhost:3000/api/v1';
const TODOS_URL = `${BASE_URL}/todos`;

/**
 * Fetch todos
 */
export function* fetchTodos() {
  const response = yield call(request, TODOS_URL);

  if (response.error === undefined || response.error === null) {
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
  const response = yield call(request, TODOS_URL, {
    method: 'POST',
    body: payload.entities.todos[payload.result],
  });

  if (response.error === undefined || response.error === null) {
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
