import { SUBMIT_REQUEST } from './constants';


/**
 * Create an action that the Form component understands, namely using promises
 * to atain communication between different sagas.
 *
 * @param  {function} requestAction
 *         An action creator to trigger the request action.
 * @param  {array} types
 *         An array containing two constants, the first should be the success
 *         and the second the failure constants to the request.
 *
 * @return {function}
 *         Returns a function that accepts the form id, the form values and the
 *         dispatch method.
 *         This function then returns a promise which the Form saga can
 *         understand.
 */
const createFormSubmitAction = (requestAction, types) => {
  const [successActionType, failureActionType] = types;

  return (id, data, dispatch) => new Promise((resolve, reject) => dispatch({
    type: SUBMIT_REQUEST,
    meta: { resolve, reject, successActionType, failureActionType },
    payload: {
      id,
      action: requestAction(data),
    },
  }));
};

export {
  createFormSubmitAction,
};
