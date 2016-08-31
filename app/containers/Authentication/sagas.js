import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { REGISTRATION_REQUEST } from './constants';
import { registrationSuccess, registrationFailure } from './actions';

import { URLS } from 'api';
import request from 'utils/request';


// Individual exports for testing
export function* registration({ payload }) {
  const { values, resolve, reject } = payload;
  const response = yield call(request, URLS.REGISTRATION_URL, {
    method: 'post',
    body: values,
  });

  if (!response.error) {
    yield put(registrationSuccess());
    if (resolve) yield call(resolve);
  } else {
    yield put(registrationFailure(response));
    if (reject) yield call(reject, response);
  }
}

function* registrationWatcher() {
  yield* takeEvery(REGISTRATION_REQUEST, registration);
}

// All sagas to be loaded
export default [
  registrationWatcher,
];
