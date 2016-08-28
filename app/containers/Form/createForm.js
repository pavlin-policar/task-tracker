import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, camelCase, trimEnd } from 'lodash';
import invariant from 'invariant';

import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
} from './actions';
import { getFormValues, getFormErrors } from './selectors';

import * as validators from './validators';


const generateForm = ({ id }) => (FormComponent) => {
  class FormWrapper extends React.Component {
    static displayName = `Form(${FormComponent.displayName})`

    static propTypes = {
      children: React.PropTypes.node,
      className: React.PropTypes.string,
      onSubmit: React.PropTypes.func,
      registerForm: React.PropTypes.func.isRequired,
      unregisterForm: React.PropTypes.func.isRequired,
      attachToForm: React.PropTypes.func.isRequired,
      detachFromForm: React.PropTypes.func.isRequired,

      values: React.PropTypes.object,
      errors: React.PropTypes.object,
      change: React.PropTypes.func.isRequired,
    }

    static childContextTypes = {
      form: React.PropTypes.object,
    }

    constructor(props) {
      super(props);

      this.validate = this.validate.bind(this);
      this.attach = this.attach.bind(this);
      this.detach = this.detach.bind(this);
      this.change = this.change.bind(this);
    }

    getChildContext() { return { form: this }; }

    componentWillMount() { this.props.registerForm(id); }

    shouldComponentUpdate(nextProps) {
      return (
        this.props.values !== nextProps.values ||
        this.props.errors !== nextProps.errors
      );
    }

    componentWillUnmount() { this.props.unregisterForm(id); }

    attach(name) { this.props.attachToForm({ name, id }); }
    detach(name) { this.props.detachFromForm({ name, id }); }
    change(name, value) { this.props.change({ id, name, value }); }

    get id() { return id; }

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

    render() {
      return React.Children.only(
        <FormComponent
          values={this.props.values}
          errors={this.props.errors}
        />
      );
    }
  }
  const mapStateToProps = (state) => ({
    values: getFormValues(id)(state),
    errors: getFormErrors(id)(state),
  });
  const mapDispatchToProps = {
    registerForm,
    unregisterForm,
    attachToForm,
    detachFromForm,
    change,
  };
  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
};

export default generateForm;
