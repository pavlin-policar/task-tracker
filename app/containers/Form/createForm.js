import React from 'react';
import { connect } from 'react-redux';

import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
} from './actions';
import {
  getFormValues,
  getFormErrors,
  getFormIsValid,
} from './selectors';


const generateForm = ({ id }) => (FormComponent) => {
  class FormWrapper extends React.Component {
    static displayName = `Form(${FormComponent.displayName})`

    static propTypes = {
      values: React.PropTypes.object.isRequired,
      errors: React.PropTypes.object.isRequired,
      isValid: React.PropTypes.bool.isRequired,
      change: React.PropTypes.func.isRequired,
      registerForm: React.PropTypes.func.isRequired,
      unregisterForm: React.PropTypes.func.isRequired,
      attachToForm: React.PropTypes.func.isRequired,
      detachFromForm: React.PropTypes.func.isRequired,
    }

    static childContextTypes = {
      form: React.PropTypes.object,
    }

    constructor(props) {
      super(props);

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

    attach(payload) { this.props.attachToForm({ ...payload, id }); }
    detach(payload) { this.props.detachFromForm({ ...payload, id }); }
    change(payload) { this.props.change({ ...payload, id }); }

    get id() { return id; }

    render() {
      return React.Children.only(
        <FormComponent
          values={this.props.values}
          errors={this.props.errors}
          isValid={this.props.isValid}
        />
      );
    }
  }
  const mapStateToProps = (state) => ({
    values: getFormValues(id)(state),
    errors: getFormErrors(id)(state),
    isValid: getFormIsValid(id)(state),
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
