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
    errors: React.PropTypes.object.isRequired,
    register: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  // checkEmailExists(email) {
  //   this.props.checkEmailExists(email);
  // }

  submit() {
  }

  render() {
    const { errors } = this.props;
    return (
      <form onSubmit={this.submit}>
        <FormattedMessage {...messages.header} />

        <FormElement
          label="First name"
          errors={errors.firstName}
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
          errors={errors.surname}
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
          errors={errors.email}
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
          errors={errors.password}
          inputComponent={
            <PasswordField
              name="password"
              placeholder="Password"
              validate="required|length:6"
            />
          }
        />

        <FormElement
          label="Confirm password"
          errors={errors.passwordConfirmation}
          inputComponent={
            <PasswordField
              name="passwordConfirmation"
              placeholder="Confirm password"
              validate="required|same-as:password"
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
