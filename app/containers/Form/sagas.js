import { takeEvery } from 'redux-saga';
import { call, put, race, take } from 'redux-saga/effects';

import { SUBMIT_REQUEST } from './constants';


// Individual exports for testing
export function* submit({ payload, meta }) {
  const { successActionType, failureActionType, resolve, reject } = meta;

  // Dispatch the initial form request action
  yield put(payload.action);
  // What response did we get?
  const responseStatus = yield race({
    success: take(successActionType),
    failure: take(failureActionType),
  });

  if (responseStatus.success) {
    yield call(resolve, responseStatus.success);
  } else {
    yield call(reject, responseStatus.failure);
  }
}

function* submitWatcher() {
  yield* takeEvery(SUBMIT_REQUEST, submit);
}

// All sagas to be loaded
export default [
  submitWatcher,
];
