import { takeEvery } from 'redux-saga';
import { put, race, take } from 'redux-saga/effects';

import { submitSuccessful, submitFailed } from './actions';
import { SUBMIT_REQUEST, VALIDATION_REQUEST } from './constants';


/**
 * Watch for asynchronous actions.
 *
 * This comes in useful when you don't simply want to listen to request and
 * submit actions, and trigger your own actions when those actions may arrive.
 * This of course requires specially shaped actions which use promises. See
 * createFormActions.js
 *
 * @param  {object}
 *         This object must contain two fields, payload and meta.
 *         Payload must contain an action signature that represents the original
 *         request action. This action will be triggered instantly to trigger
 *         the initial asynchronous flow.
 *         Meta must contain the success and failure action type constants, to
 *         which this saga will listen to. It must also contain resolve and
 *         reject methods that will signal to the form component that we are
 *         indeed dealing with an async action and so it may act appropriately
 *         when the promise is resolved / rejected.
 *
 * @see Form/createFormActions
 *
 * @return {void}
 */
export function* asyncHandler({ payload, meta }) {
  const { successActionType, failureActionType } = meta;
  const { id } = payload;

  // Dispatch the initial form request action
  yield put(payload.action);
  // What response did we get?
  const responseStatus = yield race({
    success: take(successActionType),
    failure: take(failureActionType),
  });

  // Signal that the async action has completed with appropriate status
  if (responseStatus.success) {
    const response = responseStatus.success.payload;
    yield put(submitSuccessful({ id, response }));
  } else {
    const response = responseStatus.failure.payload;
    yield put(submitFailed({ id, response }));
  }
}

function* validateWatcher() {
  yield* takeEvery(VALIDATION_REQUEST, asyncHandler);
}

function* submitWatcher() {
  yield* takeEvery(SUBMIT_REQUEST, asyncHandler);
}

// All sagas to be loaded
export default [
  submitWatcher,
  validateWatcher,
];
