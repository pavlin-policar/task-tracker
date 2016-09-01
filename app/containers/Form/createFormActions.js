import { SUBMIT_REQUEST, VALIDATION_REQUEST } from './constants';


/**
 * Generate a form action creator.
 *
 * Since all the form action creators share the same logic, it only makes sense
 * to create a generator for them.
 *
 * @param  {*} type
 *          The form action type that signals the begining of a saga. This has
 *          to do with the actions that the form will handle, but simply
 *          indicates to the Form component that something must be started.
 *
 * @return {function}
 *          The returned action accepts two parameters, request action and
 *          types. For more detailed documentation, see createFormSubmitAction
 *          or createFormValidationAction.
 *
 * @see createFormSubmitAction
 * @see createFormValidationAction
 */
const createFormAsyncAction = (type) => (requestAction, types) => {
  const [successActionType, failureActionType] = types;

  return (id, data) => ({
    type,
    meta: { successActionType, failureActionType },
    payload: {
      id,
      action: requestAction(data),
    },
  });
};

/**
 * Create an asynchronous sumission action that the Form component understands,
 * namely using promises to atain communication between different sagas.
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
export const createFormSubmitAction = createFormAsyncAction(SUBMIT_REQUEST);

/**
 * Create an asynchronous validation action that the Form component understands.
 *
 * @param  {function} requestAction
 *         An action creator to trigger the request action.
 * @param  {array} types
 *         An array containing two constants, the first should be the success
 *         and the second the failure constants to the request.

 * @return {function}
 *         Returns a function that accepts the form id, the form values and the
 *         dispatch method.
 *         This function then returns a promise which the Form saga can
 *         understand.
 */
export const createFormValidationAction = createFormAsyncAction(VALIDATION_REQUEST);
