import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { register } from 'containers/Authentication/actions';

import Form from 'components/Form/Form';
import TextField from 'components/Form/TextField';
import EmailField from 'components/Form/EmailField';
import PasswordField from 'components/Form/PasswordField';
import Button from 'components/Button';

import styles from './styles.css';


/*
 * RegistrationForm
 */
export class RegistrationForm extends React.Component {
  static propTypes = {
    register: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.form.isValid()) {
      this.props.register(this.form.getData());
    }
  }

  render() {
    return (
      <Form
        ref={(c) => { this.form = c; }}
        className={styles.registrationForm}
        onSubmit={this.submit}
      >
        <FormattedMessage {...messages.header} />

        <TextField
          name="firstName"
          placeholder="First name"
          validate="required|alpha-dash"
        />
        <TextField
          name="surname"
          placeholder="Surname"
          validate="required|alpha-dash"
        />
        <EmailField
          name="email"
          placeholder="example@example.com"
          validate="required"
        />
        <PasswordField
          name="password"
          placeholder="Password"
          validate="required|length:6"
        />
        <PasswordField
          name="passwordConfirmation"
          placeholder="Confirm password"
          validate="required|same-as:password"
        />

        <Button type="submit">Register</Button>
      </Form>
    );
  }
}

export default connect(null, { register })(RegistrationForm);
