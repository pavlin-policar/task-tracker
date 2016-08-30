import React from 'react';
import { connect } from 'react-redux';

import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
  touch,
  submit,
} from './actions';
import {
  getFormValues,
  getFormErrors,
  getFormIsValid,
  getFormFieldNames,
  getFormTouchedFields,
  getFormIsSubmitting,
} from './selectors';


const generateForm = ({ id }) => (FormComponent) => {
  class FormWrapper extends React.Component {
    static displayName = `Form(${FormComponent.displayName})`

    static propTypes = {
      // Connected values
      isSubmitting: React.PropTypes.bool.isRequired,
      values: React.PropTypes.object.isRequired,
      errors: React.PropTypes.object.isRequired,
      isValid: React.PropTypes.bool.isRequired,
      fieldNames: React.PropTypes.object,
      fieldsTouched: React.PropTypes.object,
      // Dispatch methods
      change: React.PropTypes.func.isRequired,
      registerForm: React.PropTypes.func.isRequired,
      unregisterForm: React.PropTypes.func.isRequired,
      attachToForm: React.PropTypes.func.isRequired,
      detachFromForm: React.PropTypes.func.isRequired,
      touch: React.PropTypes.func.isRequired,
      submit: React.PropTypes.func.isRequired,
    }

    static childContextTypes = {
      form: React.PropTypes.object,
    }

    constructor(props) {
      super(props);

      this.attach = this.attach.bind(this);
      this.detach = this.detach.bind(this);
      this.change = this.change.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    getChildContext() { return { form: this }; }

    componentWillMount() { this.props.registerForm(id); }

    shouldComponentUpdate(nextProps) {
      return (
        this.props.values !== nextProps.values ||
        this.props.errors !== nextProps.errors ||
        this.props.isValid !== nextProps.isValid ||
        this.props.fieldsTouched !== nextProps.fieldsTouched
      );
    }

    componentWillUnmount() { this.props.unregisterForm(id); }

    attach(payload) { this.props.attachToForm({ ...payload, id }); }
    detach(payload) { this.props.detachFromForm({ ...payload, id }); }
    change(payload) { this.props.change({ ...payload, id }); }

    get id() { return id; }

    handleSubmit(e) {
      e.preventDefault();
      // Touch all the fields
      const fields = this.props.fieldNames;
      this.props.touch({ id, fields });

      if (this.props.isValid) {
        this.props.submit({ id, data: this.props.values });
      }
    }

    render() {
      return React.Children.only(
        <FormComponent
          isSubmitting={this.props.isSubmitting}
          values={this.props.values}
          errors={this.props.errors}
          isValid={this.props.isValid}
          fieldsTouched={this.props.fieldsTouched}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  }
  const mapStateToProps = (state) => ({
    isSubmitting: getFormIsSubmitting(id)(state),
    values: getFormValues(id)(state),
    errors: getFormErrors(id)(state),
    isValid: getFormIsValid(id)(state),
    fieldNames: getFormFieldNames(id)(state),
    fieldsTouched: getFormTouchedFields(id)(state),
  });
  const mapDispatchToProps = {
    registerForm,
    unregisterForm,
    attachToForm,
    detachFromForm,
    change,
    touch,
    submit,
  };
  return connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
};

export default generateForm;
