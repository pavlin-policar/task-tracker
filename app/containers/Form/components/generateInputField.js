import React from 'react';
import classNames from 'classnames';
import { capitalize, camelCase } from 'lodash';

import styles from '../styles.css';


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
      serverValidate: React.PropTypes.oneOfType([
        React.PropTypes.func,
        React.PropTypes.arrayOf(React.PropTypes.func),
      ]),
    }

    static contextTypes = {
      form: React.PropTypes.object.isRequired,
    }

    static defaultProps = {
      validate: '',
      defaultValidations,
    }

    state = {
      value: this.props.value || '',
      needsValidation: true,
    }

    componentWillMount() {
      if (this.props.name) {
        this.context.form.attach(this);
      }
    }

    componentWillUnmount() {
      if (this.props.name) {
        this.context.form.detach(this);
      }
    }

    getValue() {
      return this.state.value;
    }

    clear() {
      this.setState({ value: '' });
    }

    onBlur = (e) => {
      if (this.state.needsValidation) {
        this.setState({ needsValidation: false });
      }
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }

    render() {
      return (
        <input
          type={type}
          name={this.props.name}
          id={this.props.name}
          className={classNames(styles.inputField, className, this.props.className)}
          value={this.state.value}
          autoFocus={this.props.autoFocus || false}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || ''}
          required={this.props.required || false}
          onChange={(e) => { this.setState({ value: e.target.value, needsValidation: true }); }}
          onKeyUp={this.props.onKeyUp || (() => {})}
          onBlur={this.onBlur}
        />
      );
    }
  };
}
