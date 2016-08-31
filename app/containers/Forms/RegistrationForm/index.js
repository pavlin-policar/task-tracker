import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import createForm from 'containers/Form/createForm';
import { checkEmailExists } from 'containers/Authentication/actions';
import { register } from './actions';

import TextField from 'containers/Form/components/TextField';
import EmailField from 'containers/Form/components/EmailField';
import PasswordField from 'containers/Form/components/PasswordField';
import Button from 'components/Button';
import FormElement from 'components/FormElement';


/*
 * RegistrationForm
 */
class RegistrationForm extends React.Component {
  static propTypes = {
    // Connected props
    isSubmitting: React.PropTypes.bool,
    errors: React.PropTypes.object,
    values: React.PropTypes.object,
    isValid: React.PropTypes.bool,
    fieldsTouched: React.PropTypes.object,
    // Form methods
    handleSubmit: React.PropTypes.func,
    register: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  // checkEmailExists(email) {
  //   this.props.checkEmailExists(email);
  // }

  onSubmit(values) {
    return new Promise((resolve, reject) =>
      this.props.register({ values, resolve, reject }));
  }

  render() {
    const { errors, fieldsTouched, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(register)}>
        <p><FormattedMessage {...messages.fillInDataText} /></p>
        <div className="row">
          <div className="col-xs-6">
            <FormElement
              errors={errors.get('firstName')}
              touched={fieldsTouched.get('firstName')}
              type={TextField}
              name="firstName"
              placeholder="First name"
              validate="required|alpha-dash"
            />
          </div>
          <div className="col-xs-6">
            <FormElement
              errors={errors.get('surname')}
              touched={fieldsTouched.get('surname')}
              type={TextField}
              name="surname"
              placeholder="Surname"
              validate="required|alpha-dash"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <FormElement
              errors={errors.get('email')}
              touched={fieldsTouched.get('email')}
              type={EmailField}
              name="email"
              placeholder="Email"
              validate="required"
              serverValidate={this.checkEmailExists}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <FormElement
              errors={errors.get('password')}
              touched={fieldsTouched.get('password')}
              type={PasswordField}
              name="password"
              placeholder="Password"
              validate="length:6"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <FormElement
              errors={errors.get('passwordConfirmation')}
              touched={fieldsTouched.get('passwordConfirmation')}
              type={PasswordField}
              name="passwordConfirmation"
              placeholder="Confirm password"
              validate="same-as:password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <Button type="submit" disabled={this.props.isSubmitting}>Register</Button>
          </div>
        </div>
      </form>
    );
  }
}

RegistrationForm = createForm({ // eslint-disable-line no-class-assign
  id: 'registration',
})(RegistrationForm);

export default connect(null, { register, checkEmailExists })(RegistrationForm);
