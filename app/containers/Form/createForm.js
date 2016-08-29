import React from 'react';
import { connect } from 'react-redux';

import {
  registerForm,
  unregisterForm,
  attachToForm,
  detachFromForm,
  change,
} from './actions';
import { getFormValues, getFormErrors } from './selectors';


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
