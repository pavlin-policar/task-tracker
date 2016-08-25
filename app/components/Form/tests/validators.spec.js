import expect from 'expect';
import { concat } from 'lodash';

import * as validator from '../validators';


function test(options) {
  const args = options.args || [];
  args.unshift(null);

  let result = [];
  if (options.valid) {
    result = concat(result, options.valid.map((valid) => {
      args[0] = valid;
      return validator[options.validator](...args) === true;
    }));
  }
  if (options.invalid) {
    result = concat(result, options.invalid.map((invalid) => {
      args[0] = invalid;
      return validator[options.validator](...args) === false;
    }));
  }
  expect(result.every(el => el === true)).toBe(true);
}

describe('validators', () => {
  it('should validate "required"', () => {
    test({
      validator: 'required',
      valid: ['foo', 'bar'],
      invalid: ['', ' '],
    });
  });

  it('should validate "alphaDash"', () => {
    test({
      validator: 'alphaDash',
      valid: ['foo', 'bar', 'foo-bar'],
      invalid: ['123', '1abc', 'abc_123'],
    });
  });
});
