import expect from 'expect';
import { put, race, take, call } from 'redux-saga/effects';

import { submit } from '../sagas';


describe('form sagas', () => {
  describe('submit saga', () => {
    const resolve = expect.createSpy();
    const reject = expect.createSpy();
    const requestAction = {
      type: 'ACTION',
      payload: 1,
    };
    let generator;
    beforeEach(() => {
      generator = submit({
        payload: { action: requestAction },
        meta: {
          successActionType: 'ACTION_SUCCESS',
          failureActionType: 'ACTION_FAILURE',
          resolve,
          reject,
        },
      });
    });

    it('should handle a successful submit', () => {
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

    it('should handle a failed submit', () => {
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
