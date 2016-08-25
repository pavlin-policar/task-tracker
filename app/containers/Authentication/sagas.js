import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { REGISTRATION_REQUEST } from './constants';
import { registrationSuccess, registrationFailure } from './actions';

import { URLS } from 'api';
import request from 'utils/request';


// Individual exports for testing
export function* registration({ payload }) {
  const response = yield call(request, URLS.REGISTRATION_URL, {
    method: 'post',
    body: payload,
  });

  if (response.errors) {
    yield put(registrationSuccess());
  } else {
    yield put(registrationFailure(response));
  }
}

function* registrationWatcher() {
  yield* takeEvery(REGISTRATION_REQUEST, registration);
}

// All sagas to be loaded
export default [
  registrationWatcher,
];
