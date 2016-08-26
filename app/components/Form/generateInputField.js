import React from 'react';
import classNames from 'classnames';
import { capitalize, camelCase, concat, isEmpty } from 'lodash';
import invariant from 'invariant';

import * as validators from './validators';
import styles from './styles.css';


/**
 * Generate an `input` type field with common methods.

 * @param  {string} type      This should be a valid input[type] string.
 * @param  {object} options   Validations that should be run on the input
 *   field by default e.g. email type fields should run an email validation without
 *   the developer having to explicitly specify that every time they want to use
 *   the component.
 * @param  {String} className A classname that should be added to the type
 *   of component.
 * @return {Component}        A `InputField` component that renders the input
 *   according to the specified options.
 */
export default function (type, { defaultValidations = '', className } = {}) {
  return class InputField extends React.Component {
    static displayName = `${capitalize(camelCase(type))}Field`;

    static propTypes = {
      placeholder: React.PropTypes.string,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
      name: React.PropTypes.string,
      onKeyUp: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      autoFocus: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      required: React.PropTypes.bool,
      validate: React.PropTypes.string,
    }

    static contextTypes = {
      registerWithForm: React.PropTypes.func,
    }

    static defaultProps = {
      validate: '',
    }

    state = {
      value: this.props.value || '',
      validated: false,
      errors: [],
    }

    componentWillMount() {
      if (this.props.name && this.context.registerWithForm) {
        this.context.registerWithForm(this);
      }
    }

    /**
     * Parse the validation string passed down from props and return an object
     * containing data to execute the validator.
     *
     * @return {array}
     * @private
     */
    parseValidators() {
      // Parse validators, remove duplicates, include default validators
      const strValidators = Object.keys(
        concat(defaultValidations.split('|'), this.props.validate.split('|'))
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

    /**
     * @return {void}
     * @private
     */
    validate() {
      if (!this.state.validated) {
        const errors = [];

        const validatorsParams = this.parseValidators();
        validatorsParams.forEach(({ validator, params }) => {
          // Confirm that the validator is recognized
          invariant(
            validator in validators,
            `${validator} validator is not recognized in validators.js`
          );

          if (!validators[validator](this.state.value, ...params)) {
            errors.push(validator);
          }
        });

        this.setState({ errors, validated: true });
        return errors;
      }
      return this.state.errors;
    }

    /**
     * Get the value of the field.
     *
     * @return {string} The value of the field.
     * @public
     */
    getValue() {
      return this.state.value;
    }

    /**
     * Get array of errors for the field.
     *
     * @return {array}
     * @public
     */
    getErrors() {
      return this.validate();
    }

    /**
     * @return {bool}
     * @public
     */
    isValid() {
      return isEmpty(this.validate());
    }

    /**
     * Clear the textfield of any text.
     *
     * @return {void}
     * @public
     */
    clear() {
      this.setState({ value: '', validated: false });
    }

    render() {
      return (
        <input
          type={type}
          name={this.props.name}
          id={this.props.name}
          className={classNames(styles.inputField, className, this.props.className)}
          value={this.state.value}
          onChange={(e) => { this.setState({ value: e.target.value, validated: false }); }}
          onKeyUp={this.props.onKeyUp || (() => {})}
          onBlur={this.props.onBlur || (() => {})}
          autoFocus={this.props.autoFocus || false}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || ''}
          required={this.props.required || false}
        />
      );
    }
  };
}
