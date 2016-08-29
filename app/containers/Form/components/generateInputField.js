import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { capitalize, camelCase } from 'lodash';
import invariant from 'invariant';

import withFormId from './withFormId';
import {
  change,
  focus,
  blur,
} from '../actions';
import { getFieldValue } from '../selectors';

import styles from '../styles.css';


/**
 * Generate an input field with common input functionality.
 *
 * @param  {string} type      This should be a valid input[type] string.
 * @param  {object} options   Validations that should be run on the input
 *   field by default e.g. email type fields should run an email validation without
 *   the developer having to explicitly specify that every time they want to use
 *   the component.
 * @return {Component}        A `InputField` component that renders the input
 *   according to the specified options.
 */
export function generateInputComponent(type, { defaultValidations = '' } = {}) {
  return class InputField extends React.Component {
    static displayName = `${capitalize(camelCase(type))}Field`;

    static propTypes = {
      // User defined methods
      placeholder: React.PropTypes.string,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
      name: React.PropTypes.string,
      autoFocus: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      required: React.PropTypes.bool,
      validate: React.PropTypes.string,
      // Event callbacks
      onKeyUp: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onFocus: React.PropTypes.func,
      onBlur: React.PropTypes.func,
      // Dispatch methods
      blur: React.PropTypes.func,
      focus: React.PropTypes.func,
      change: React.PropTypes.func,
    }

    static contextTypes = {
      form: React.PropTypes.object.isRequired,
    }

    static defaultProps = {
      validate: '',
      defaultValidations,
    }

    constructor(props, context) {
      super(props, context);

      invariant(
        this.context.form,
        'Input type elements must be contained within a valid `Form` component!'
      );

      this.formId = context.form.id;

      this.onChange = this.onChange.bind(this);
      this.onFocus = this.onFocus.bind(this);
      this.onBlur = this.onBlur.bind(this);
    }

    componentWillMount() {
      this.context.form.attach({
        name: this.props.name,
        validationString: this.props.validate,
        initialValue: this.props.value,
      });
    }

    shouldComponentUpdate() {
      return true;
    }

    componentWillUnmount() {
      this.context.form.detach({ name: this.props.name });
    }

    /**
     * Methods that dispatch actions.
     */

    onChange(e) {
      if ((this.props.onChange && this.props.onChange(e)) || !this.props.onChange) {
        this.props.change({
          id: this.formId,
          name: this.props.name,
          value: e.target.value,
        });
      }
    }

    onFocus() {
      this.props.focus({ id: this.formId, name: this.props.name });
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    }

    onBlur() {
      this.props.blur({ id: this.formId, name: this.props.name });
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }

    render() {
      return (
        <input
          type={type}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          className={classNames(styles.inputField, this.props.className)}
          autoFocus={this.props.autoFocus || false}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || ''}
          required={this.props.required || false}
          onKeyUp={this.props.onKeyUp || (() => {})}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      );
    }
  };
}

/**
 * Generate a connected input field component that can function with form
 * components.
 */
export default function generateInputField(...params) {
  const InputField = generateInputComponent(...params);

  const mapStateToProps = (state, { formId, name }) => ({
    value: getFieldValue(formId, name)(state),
  });
  const mapDispatchToProps = {
    change,
    focus,
    blur,
  };
  return withFormId(connect(mapStateToProps, mapDispatchToProps)(InputField));
}
