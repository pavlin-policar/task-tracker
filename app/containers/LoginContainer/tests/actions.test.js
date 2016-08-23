import expect from 'expect';

import * as actions from '../actions';
import * as constants from '../constants';


describe('LoginContainer actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: constants.DEFAULT_ACTION,
      };
      expect(actions.defaultAction()).toEqual(expected);
    });
  });
});
