import expect from 'expect';
import { put, race, take, call } from 'redux-saga/effects';

import { asyncHandler } from '../sagas';


describe('form sagas', () => {
  describe('asyncHandler saga', () => {
    const resolve = expect.createSpy();
    const reject = expect.createSpy();
    const requestAction = {
      type: 'ACTION',
      payload: 1,
    };
    let generator;
    beforeEach(() => {
      generator = asyncHandler({
        payload: { action: requestAction },
        meta: {
          successActionType: 'ACTION_SUCCESS',
          failureActionType: 'ACTION_FAILURE',
          resolve,
          reject,
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
      expect(generator.next({ success: true }).value).toEqual(
        call(resolve, true)
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
      expect(generator.next({ failure: true }).value).toEqual(
        call(reject, true)
      );
    });
  });
});
