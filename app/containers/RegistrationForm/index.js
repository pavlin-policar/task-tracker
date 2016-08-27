import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { register, checkEmailExists } from 'containers/Authentication/actions';

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

  // checkEmailExists(email) {
  //   this.props.checkEmailExists(email);
  // }

  submit() {
    if (this.form.valid) {
      this.props.register(this.form.data);
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

export default connect(null, { register, checkEmailExists })(RegistrationForm);
