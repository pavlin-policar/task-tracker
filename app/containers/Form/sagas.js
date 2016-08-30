import { takeEvery, delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { SUBMIT_REQUEST } from './constants';
import { submittingFailed } from './actions';

// import { URLS } from 'api';
// import request from 'utils/request';


// Individual exports for testing
export function* formSubmit({ payload }) {
  // Store which form was submitted
  const { id } = payload;

  yield delay(3000);
  yield put(submittingFailed({ id }));
}

function* formSubmitWatcher() {
  yield* takeEvery(SUBMIT_REQUEST, formSubmit);
}

// All sagas to be loaded
export default [
  formSubmitWatcher,
];
