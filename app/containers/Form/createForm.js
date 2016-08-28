import React from 'react';
import { connect } from 'react-redux';
import { mapValues, merge, isEmpty, omit, omitBy, camelCase, trimEnd } from 'lodash';
import invariant from 'invariant';

import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm
} from './actions';
import { getFormFields } from './selectors';

import * as validators from './validators';


const generateForm = ({ id }) => (FormComponent) => {
  class FormWrapper extends React.Component {
    static displayName = `Form(${FormComponent.displayName})`

    static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      onSubmit: React.PropTypes.func,
    }

    static childContextTypes = {
      form: React.PropTypes.object,
      attachToForm: React.PropTypes.func,
      detachFromForm: React.PropTypes.func,
      triggerValidation: React.PropTypes.func,
    }

    constructor(props) {
      super(props);

      this.validate = this.validate.bind(this);
    }

    componentWillMount() {
      this.props.registerForm(id);
    }

    componentWillUnmount() {
      this.props.unregisterForm(id);
    }

    state = {
      formElements: {},
    }

    getChildContext = () => ({ form: this })

    attach = (component) => this.props.attachToForm({ component, id })
    detach = (component) => this.props.detachFromForm({ component, id })

    handleSubmit = (callback) => (e) => {
      e.preventDefault();
      callback(this.data);
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

        if (!validators[validator](component.getValue(), params, this.data)) {
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
      const data = mapValues(this.state.formElements, (el) => el.getValue());
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
      return omitBy(errors, isEmpty);
    }

    /**
     * If validations are specified, check if the data is valid.
     *
     * @return {bool}
     * @public
     */
    get valid() {
      return isEmpty(this.errors);
    }

    render() {
      return React.Children.only(
        <FormComponent
          {...this.props}
          data={this.data}
          errors={this.errors}
          isValid={this.valid}
          handleSubmit={this.handleSubmit} />
      );
    }
  }
  const mapStateToProps = (state) => ({
    fields: getFormFields(id)(state),
  });
  const mapDispatchToProps = {
    registerForm,
    unregisterForm,
    attachToForm,
    detachFromForm,
  };
  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
}

export default generateForm;
