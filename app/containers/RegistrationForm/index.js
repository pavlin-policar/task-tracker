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
import FormElement from 'components/FormElement';

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

        <div className="helpText">foo</div>
        <FormElement
          label="First name"
          helpText="Tell us you name"
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
          helpText="Tell us your last name"
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
          helpText="Tell us your email"
          inputComponent={
            <EmailField
              name="email"
              placeholder="example@example.com"
              validate="required"
            />
          }
        />

        <FormElement
          label="Password"
          helpText="Enter a password"
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
          helpText="Please repeat your password"
          inputComponent={
            <PasswordField
              name="passwordConfirmation"
              placeholder="Confirm password"
              validate="required|same-as:password"
            />
          }
        />

        <Button type="submit">Register</Button>
      </Form>
    );
  }
}

export default connect(null, { register })(RegistrationForm);
