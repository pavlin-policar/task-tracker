import expect from 'expect';
import { Map } from 'immutable';

import auth from '../reducer';
import {
  getIsLoggedIn,
} from '../selectors';


const s = (state) => Map({ auth: state });

describe('authentication selectors', () => {
  describe('getIsLoggedIn', () => {
    it('should return false for the default state', () => {
      expect(getIsLoggedIn()(s(auth(undefined, {})))).toBe(false);
    });
  });
});
