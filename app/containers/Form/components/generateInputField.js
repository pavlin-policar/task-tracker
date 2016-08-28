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
 * Generate an `input` type field with common methods.

 * @param  {string} type      This should be a valid input[type] string.
 * @param  {object} options   Validations that should be run on the input
 *   field by default e.g. email type fields should run an email validation without
 *   the developer having to explicitly specify that every time they want to use
 *   the component.
 * @return {Component}        A `InputField` component that renders the input
 *   according to the specified options.
 */
export default function (type, { defaultValidations = '' } = {}) {
  class InputField extends React.Component {
    static displayName = `${capitalize(camelCase(type))}Field`;

    static propTypes = {
      placeholder: React.PropTypes.string,
      value: React.PropTypes.string,
      className: React.PropTypes.string,
      name: React.PropTypes.string,
      onKeyUp: React.PropTypes.func,
      blur: React.PropTypes.func,
      focus: React.PropTypes.func,
      change: React.PropTypes.func,
      autoFocus: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      required: React.PropTypes.bool,
      validate: React.PropTypes.string,
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
      this.context.form.attach(this);
    }

    shouldComponentUpdate() {
      return true;
    }

    componentWillUnmount() {
      this.context.form.detach(this);
    }

    onChange(e) { this.props.change(this.formId, this.props.name, e.target.value); }
    onFocus() { this.props.focus(this.formId, this.props.name); }
    onBlur() { this.props.blur(this.formId, this.props.name); }

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
  }

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
