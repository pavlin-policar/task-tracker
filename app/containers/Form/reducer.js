import { Map, List, Record } from 'immutable';
import { trimEnd, camelCase, isEmpty } from 'lodash';
import invariant from 'invariant';

import {
  REGISTER_FORM,
  UNREGISTER_FORM,
  ATTACH_TO_FORM,
  DETACH_FROM_FORM,
  CHANGE,
} from './constants';
import * as validators from './validators';


/**
 * Data types
 */

const FieldRecord = Record({
  value: '',
  validationString: '',
  errors: List(),
});
export class Field extends FieldRecord {
  isValid() { return this.get('errors').isEmpty(); }
}

const FormRecord = Record({
  fields: Map(),
});
export class Form extends FormRecord {
  getData() {
    return this.fields.map(f => f.get('value'));
  }

  getErrors() {
    return this.fields.map(f => f.get('errors'));
  }

  /**
   * Parse the validation string passed down from props and return an object
   * containing data to execute the validator.
   *
   * @return {array}
   * @private
   */
  static parseValidators(validationString) {
    // Parse validators, remove duplicates, include default validators
    const strValidators = Object.keys(
      trimEnd(validationString, '|').split('|')
        .reduce((acc, el) => (el ? { ...acc, [el]: null } : acc), {})
    );
    return strValidators.map((strValidator) => {
      let validator = strValidator;
      let params = [];

      // Parameters are separated from the validation with a colon
      if (strValidator.indexOf(':') > 0) {
        [validator, ...params] = strValidator.split(':');

        // Multiple parameters may be delimited by a comma
        if (params[0].indexOf(',') > -1) {
          params = params[0].split(',');
        }
      }
      validator = camelCase(validator);
      // Replace any empty string parameters with undefined
      params = params.map((el) => (isEmpty(el) ? undefined : el));

      return { validator, params };
    });
  }

  validateValue(value, validationString) {
    const errors = [];

    const validatorsParams = this.constructor.parseValidators(validationString);
    validatorsParams.forEach(({ validator, params }) => {
      // Confirm that the validator is recognized
      invariant(
        validator in validators,
        `${validator} validator is not recognized in validators.js`
      );

      if (!validators[validator](value, params, this.getData().toJS())) {
        errors.push(validator);
      }
    });

    return errors;
  }

  validate() {
    return this.set('fields', this.fields.map(f => f.set('errors', List(
      this.validateValue(f.get('value'), f.get('validationString'))
    ))));
  }

  isValid() {
    return this.fields.map(f => f.isValid()).every(f => f === true);
  }
}

/**
 * Reducers
 */

export const field = (state = new Field(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACH_TO_FORM:
      return payload.validationString ?
        state.set('validationString', payload.validationString) :
        state;
    case CHANGE:
      return state.set('value', payload.value);
    default:
      return state;
  }
};

export const form = (state = new Form(), action) => {
  const { type, payload } = action;

  switch (type) {
    case ATTACH_TO_FORM:
      return state.setIn(['fields', payload.name], field(undefined, action));
    case DETACH_FROM_FORM:
      return state.removeIn(['fields', payload.name]);
    case CHANGE:
      return state.setIn(
          ['fields', payload.name],
          field(state.getIn(['fields', payload.name]), action)
        ).validate();
    default:
      return state;
  }
};

export const forms = (state = new Map(), action) => {
  const { type, payload } = action;
  switch (type) {
    // Register form in reducer
    case REGISTER_FORM:
      return state.set(payload, form(undefined, action));
    case UNREGISTER_FORM:
      return state.remove(payload);
    // For everything else, just pass down to form
    case ATTACH_TO_FORM:
    case DETACH_FROM_FORM:
    case CHANGE:
      return state.set(payload.id, form(state.get(payload.id), action));
    default:
      return state;
  }
};

export default forms;
