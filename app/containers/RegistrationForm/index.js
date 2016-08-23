import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import Form from 'components/Form';
import TextField from 'components/TextField';
import EmailField from 'components/EmailField';
import PasswordField from 'components/PasswordField';
import Button from 'components/Button';

import styles from './styles.css';


/*
 * RegistrationForm
 */
export class RegistrationForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Form
        className={styles.registrationForm}
        onSubmit={this.onSubmit}
      >
        <FormattedMessage {...messages.header} />

        <TextField
          name="name"
          placeholder="First name"
          validate="alpha-dash"
          required
        />
        <TextField
          name="surname"
          placeholder="Surname"
          validate="alpha-dash"
          required
        />
        <TextField
          name="username"
          placeholder="Username"
          required
        />
        <EmailField
          name="email"
          required
        />
        <PasswordField
          name="password"
          required
        />
        <PasswordField
          name="passwordConfirmation"
          required
        />

        <Button type="submit">Register</Button>
      </Form>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(RegistrationForm);
