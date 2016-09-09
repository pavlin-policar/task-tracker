import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import {
  REGISTRATION_REQUEST,
  CHECK_EMAIL_EXISTS_REQUEST,
  LOGIN_REQUEST,
} from './constants';
import {
  registrationSuccess,
  registrationFailure,
  emailExists,
  emailNotInUse,
  loginSuccess,
  loginFailure,
} from './actions';

import { URLS } from 'api';
import request from 'utils/request';


/**
 * Check that email is not already in use
 */
export function* checkEmailExists({ payload }) {
  const { email } = payload;

  const response = yield call(request, `${URLS.CHECK_USER_EXISTS}?email=${email}`);

  if (!response.error) {
    yield put(emailNotInUse());
  } else {
    yield put(emailExists(response));
  }
}

function* checkEmailExistsWatcher() {
  yield* takeEvery(CHECK_EMAIL_EXISTS_REQUEST, checkEmailExists);
}

/**
 * Registration
 */
export function* registration({ payload }) {
  const { values } = payload;
  const response = yield call(request, URLS.REGISTRATION_URL, {
    method: 'post',
    body: values,
  });

  if (!response.error) {
    yield put(registrationSuccess());
  } else {
    yield put(registrationFailure(response));
  }
}

function* registrationWatcher() {
  yield* takeEvery(REGISTRATION_REQUEST, registration);
}

/**
 * Login
 */
export function* login({ payload }) {
  const { values } = payload;
  const response = yield call(request, URLS.LOGIN_URL, {
    method: 'post',
    body: values,
  });

  if (!response.error) {
    yield put(loginSuccess());
  } else {
    yield put(loginFailure(response));
  }
}

function* loginWatcher() {
  yield* takeEvery(LOGIN_REQUEST, login);
}

// All sagas to be loaded
export default [
  registrationWatcher,
  checkEmailExistsWatcher,
  loginWatcher,
];
