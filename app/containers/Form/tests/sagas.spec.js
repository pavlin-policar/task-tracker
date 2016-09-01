import expect from 'expect';
import { put, race, take } from 'redux-saga/effects';

import * as actions from '../actions';
import { asyncHandler } from '../sagas';


describe('form sagas', () => {
  describe('asyncHandler saga', () => {
    const successSpy = expect.spyOn(actions, 'submitSuccessful');
    const failureSpy = expect.spyOn(actions, 'submitFailed');

    const requestAction = {
      type: 'ACTION',
      payload: 1,
    };
    const id = 'form';
    const response = 123;


    let generator;
    beforeEach(() => {
      successSpy.restore();
      failureSpy.restore();
      generator = asyncHandler({
        payload: { id, action: requestAction },
        meta: {
          successActionType: 'ACTION_SUCCESS',
          failureActionType: 'ACTION_FAILURE',
        },
      });
    });

    it('should handle a successful async action', () => {
      expect(generator.next().value).toEqual(put(requestAction));
      expect(generator.next().value).toEqual(
        race({
          success: take('ACTION_SUCCESS'),
          failure: take('ACTION_FAILURE'),
        })
      );
      expect(
        generator.next({ success: { payload: response } }).value
      ).toEqual(
        put(actions.submitSuccessful({ id, response }))
      );
    });

    it('should handle a failed async action', () => {
      expect(generator.next().value).toEqual(put(requestAction));
      expect(generator.next().value).toEqual(
        race({
          success: take('ACTION_SUCCESS'),
          failure: take('ACTION_FAILURE'),
        })
      );
      expect(
        generator.next({ failure: { payload: response } }).value
      ).toEqual(
        put(actions.submitFailed({ id, response }))
      );
    });
  });
});
