import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createForm } from '@policar/react-redux-form';

import messages from './messages';
import { register, checkEmailExists } from './actions';

import TextField from 'components/Form/TextField';
import EmailField from 'components/Form/EmailField';
import PasswordField from 'components/Form/PasswordField';
import Button from 'components/Button';
import FormElement from 'components/FormElement';


/*
 * RegistrationForm
 */
class RegistrationForm extends React.Component {
  static propTypes = {
    // Connected props
    isSubmitting: React.PropTypes.bool.isRequired,
    errors: React.PropTypes.object.isRequired,
    values: React.PropTypes.object.isRequired,
    isValid: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    // Form methods
    handleSubmit: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.emailUnique = this.emailUnique.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
  }

  onSubmitSuccess() {
    this.props.router.push('/register?success=true');
    this.props.clear();
  }

  emailUnique(...params) {
    if (this.props.values.get('email')) {
      return checkEmailExists(...params);
    }
    return {};
  }

  render() {
    const { errors, fields, handleSubmit, isSubmitting } = this.props;
    const { emailUnique, onSubmitSuccess } = this;

    return (
      <form onSubmit={handleSubmit(register, [onSubmitSuccess])}>
        <p><FormattedMessage {...messages.fillInDataText} /></p>
        <div className="row">
          <div className="col-xs-6">
            <FormElement
              errors={errors.get('firstName')}
              touched={fields.getIn(['firstName', 'touched'])}
              type={TextField}
              name="firstName"
              placeholder="First name"
              validate="required|alpha-dash"
            />
          </div>
          <div className="col-xs-6">
            <FormElement
              errors={errors.get('surname')}
              touched={fields.getIn(['surname', 'touched'])}
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
              touched={fields.getIn(['email', 'touched'])}
              type={EmailField}
              name="email"
              placeholder="Email"
              validate="required"
              validateAsync={{ emailUnique }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <FormElement
              errors={errors.get('password')}
              touched={fields.getIn(['password', 'touched'])}
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
              touched={fields.getIn(['passwordConfirmation', 'touched'])}
              type={PasswordField}
              name="passwordConfirmation"
              placeholder="Confirm password"
              validate="same-as:password"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            <Button type="submit" disabled={isSubmitting}>Register</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default createForm({
  id: 'registration',
})(RegistrationForm);
