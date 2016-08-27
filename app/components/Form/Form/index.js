import React from 'react';
import classNames from 'classnames';
import { mapValues, merge, isEmpty, omit, omitBy, camelCase, trimEnd } from 'lodash';
import invariant from 'invariant';
import * as validators from '../validators';

import styles from './styles.css';


/**
* Form
*/
class Form extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
  }

  static childContextTypes = {
    attachToForm: React.PropTypes.func,
    detachFromForm: React.PropTypes.func,
    triggerValidation: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  state = {
    formElements: {},
    data: {},
    errors: {},
  }

  getChildContext() {
    return {
      attachToForm: (c) => {
        this.setState(merge(this.state, { formElements: { [c.props.name]: c } }));
      },
      detachFromForm: (c) => {
        this.setState({
          ...this.state,
          formElements: omit(this.state.formElements, c.props.name),
        });
      },
      triggerValidation: (el) => {
        this.setState({
          ...this.state,
          errors: { ...this.state.errors, [name]: this.validate(el) },
        });
      },
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.valid) {
      this.props.onSubmit(this.data);
    }
  }

  /**
   * Parse the validation string passed down from props and return an object
   * containing data to execute the validator.
   *
   * @return {array}
   * @private
   */
  parseValidators(validationString) {
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

  /**
   * Validate the component data with its validation string and set form state
   * appropriately.
   *
   * @return {void}
   * @private
   */
  validate(component) {
    const { validate, defaultValidations } = component.props;
    const errors = [];

    const validatorsParams = this.parseValidators(`${validate}|${defaultValidations}`);
    validatorsParams.forEach(({ validator, params }) => {
      // Confirm that the validator is recognized
      invariant(
        validator in validators,
        `${validator} validator is not recognized in validators.js`
      );

      if (!validators[validator](component.value, ...params)) {
        errors.push(validator);
      }
    });

    return errors;
  }

  /**
   * Get the form data from any elements that contain the `name` attribute.
   *
   * @return {object}
   * @public
   */
  get data() {
    const data = mapValues(this.state.formElements, (el) => el.value);
    this.setState(merge(this.state, { data }));
    return data;
  }

  /**
   * Get any validation errors from tracked elements.
   *
   * @return {object}
   * @public
   */
  get errors() {
    const errors = mapValues(this.state.formElements, this.validate);
    this.setState({ errors });
    return omitBy(errors, isEmpty);
  }

  /**
   * If validations are specified, check if the data is valid.
   *
   * @public
   */
  get valid() {
    return isEmpty(this.errors);
  }

  render() {
    return (
      <form
        className={classNames(styles.form, this.props.className)}
        onSubmit={this.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
