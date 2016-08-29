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
    errors: React.PropTypes.object,
    values: React.PropTypes.object,
    isValid: React.PropTypes.bool,
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
    const { errors } = this.props;
    return (
      <form onSubmit={this.submit}>
        <FormattedMessage {...messages.header} />

        <FormElement
          label="First name"
          errors={errors.get('firstName')}
          inputComponent={
            <TextField
              name="firstName"
              placeholder="First name"
              validate="required|alpha-dash"
            />
          }
        />

        <FormElement
          label="Surname"
          errors={errors.get('surname')}
          inputComponent={
            <TextField
              name="surname"
              placeholder="Surname"
              validate="required|alpha-dash"
            />
          }
        />

        <FormElement
          label="Email"
          errors={errors.get('email')}
          inputComponent={
            <EmailField
              name="email"
              placeholder="example@example.com"
              validate="required"
              serverValidate={this.checkEmailExists}
            />
          }
        />

        <FormElement
          label="Password"
          errors={errors.get('password')}
          inputComponent={
            <PasswordField
              name="password"
              placeholder="Password"
              validate="length:6"
            />
          }
        />

        <FormElement
          label="Confirm password"
          errors={errors.get('passwordConfirmation')}
          inputComponent={
            <PasswordField
              name="passwordConfirmation"
              placeholder="Confirm password"
              validate="same-as:password"
            />
          }
        />

        <Button type="submit">Register</Button>
      </form>
    );
  }
}

RegistrationForm = createForm({ // eslint-disable-line no-class-assign
  id: 'registration',
})(RegistrationForm);

export default connect(null, { register, checkEmailExists })(RegistrationForm);
