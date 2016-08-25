import React from 'react';
import classNames from 'classnames';
import { capitalize, camelCase, concat, isEmpty } from 'lodash';
import invariant from 'invariant';

import * as validators from './validators';
import styles from './styles.css';


/**
 * Generate an `input` type field with common methods.

 * @param  {string} type          This should be a valid input[type] string.
 * @param  {String} [validate=''] Validations that should be run on the input
 *   field by default e.g. email type fields should run an email validation without
 *   the developer having to explicitly specify that every time they want to use
 *   the component.
 * @param  {String} className     A classname that should be added to the type
 *   of component.
 * @return {Component}            A `InputField` component that renders the input
 *   according to the specified options.
 */
export default function (type, { validate = '', className } = {}) {
  return class InputField extends React.Component {
    static displayName = `${capitalize(camelCase(type))}Field`;

    static propTypes = {
      placeholder: React.PropTypes.string,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
      name: React.PropTypes.string,
      onKeyUp: React.PropTypes.func,
      autoFocus: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      required: React.PropTypes.bool,
      validate: React.PropTypes.string,
    }

    static defaultProps = {
      validate: '',
    }

    state = {
      value: this.props.value || '',
      validated: false,
      errors: [],
    }

    parseValidators() {
      // Parse validators, remove duplicates, include default validators
      const strValidators = Object.keys(
        concat(validate.split('|'), this.props.validate.split('|'))
          .reduce((acc, el) => (el ? { ...acc, [el]: null } : acc), {})
      );
      return strValidators.map((strValidator) => {
        let validator = strValidator;
        let params = [];

        if (strValidator.indexOf(':') > 0) {
          [validator, ...params] = strValidator.split(':');

          if (params[0].indexOf(',') > -1) {
            params = params[0].split(',');
          }
        }
        params = params.map((el) => (isEmpty(el) ? undefined : el));

        return { validator, params };
      });
    }

    validate() {
      if (!this.state.validated) {
        const errors = [];

        const validatorsParams = this.parseValidators();
        validatorsParams.forEach(({ validator, params }) => {
          invariant(
            validator in validators,
            `${validator} validator is not recognized in validators.js`
          );

          if (!validators[validator](this.state.value, ...params)) {
            errors.push(validator);
          }
        });

        this.setState({ errors, validated: true });
      }
    }

    /**
     * Get the value of the textfield.
     *
     * @return {string} The value of the textfield.
     */
    getValue() {
      return this.state.value;
    }

    getErrors() {
      this.validate();
      return this.state.errors;
    }

    isValid() {
      this.validate();
      return isEmpty(this.state.errors);
    }

    /**
     * Clear the textfield of any text.
     */
    clear() {
      this.setState({ value: '', validated: false });
    }

    render() {
      return (
        <input
          type={type}
          name={this.props.name}
          className={classNames(styles.inputField, className, this.props.className)}
          value={this.state.value}
          onChange={(e) => { this.setState({ value: e.target.value, validated: false }); }}
          onKeyUp={this.props.onKeyUp || (() => {})}
          autoFocus={this.props.autoFocus || false}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || ''}
          required={this.props.required || false}
        />
      );
    }
  };
}
