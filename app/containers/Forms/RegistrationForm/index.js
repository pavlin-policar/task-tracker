import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { register, checkEmailExists } from 'containers/Authentication/actions';
import createForm from 'containers/Form/createForm';

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
    errors: React.PropTypes.object,
    values: React.PropTypes.object,
    isValid: React.PropTypes.bool,
    fieldsTouched: React.PropTypes.object,
    // register: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  // checkEmailExists(email) {
  //   this.props.checkEmailExists(email);
  // }

  submit(e) {
    // console.log(this.props.errors.toJS());
    // console.log(this.props.values.toJS());
    e.preventDefault();
    if (this.props.isValid) {
      // console.log('valid');
    }
  }

  render() {
    const { errors, fieldsTouched } = this.props;
    return (
      <form onSubmit={this.submit}>
        <p><FormattedMessage {...messages.fillInDataText} /></p>
        <div className="row">
          <div className="col-md-6">
            <FormElement
              errors={errors.get('firstName')}
              touched={fieldsTouched.get('firstName')}
              type={TextField}
              name="firstName"
              placeholder="First name"
              validate="required|alpha-dash"
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md">
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
          <div className="col-md">
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
          <div className="col-md">
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
          <div className="col-md">
            <Button type="submit">Register</Button>
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
