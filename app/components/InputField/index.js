import React from 'react';
import classNames from 'classnames';
import { capitalize, camelCase, concat } from 'lodash';

import styles from './styles.css';


/**
 * Generate an `input` type field with common methods.

 * @param  {string} type             This should be a valid input[type] string.
 * @param  {String} [validations=''] Validations that should be run on the input
 *   field by default e.g. email type fields should run an email validation without
 *   the developer having to explicitly specify that every time they want to use
 *   the component.
 * @param  {String} className        A classname that should be added to the type
 *   of component.
 * @return {Component}               A `InputField` component that renders the input
 *   according to the specified options.
 */
export default function (type, { validations = '', className }) {
  return class InputField extends React.Component {
    static displayName = `${capitalize(camelCase(type))}Field`;

    static propTypes = {
      placeholder: React.PropTypes.string,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
      onKeyUp: React.PropTypes.func,
      autoFocus: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      validations: React.PropTypes.string,
    }

    static defaultProps = {
      validations: '',
    }

    state = {
      value: this.props.value || '',
    }

    parseValidations() {
      // Parse validators, remove duplicates, include default validators
      const validators = Object.keys(
        concat(validations.split('|'), this.props.validations.split('|'))
          .reduce((acc, el) => (el ? { ...acc, [el]: null } : acc), {})
      );
      return validators;
    }

    /**
     * Get the value of the textfield.
     *
     * @return {string} The value of the textfield.
     */
    getValue() {
      return this.state.value;
    }

    /**
     * Clear the textfield of any text.
     */
    clear() {
      this.setState({ value: '' });
    }

    render() {
      return (
        <input
          type={type}
          className={classNames(styles.inputField, className, this.props.className)}
          value={this.state.value}
          onChange={(e) => { this.setState({ value: e.target.value }); }}
          onKeyUp={this.props.onKeyUp || (() => {})}
          autoFocus={this.props.autoFocus || false}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || ''}
        />
      );
    }
  };
}
