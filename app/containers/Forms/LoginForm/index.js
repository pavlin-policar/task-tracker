import React from 'react';
import { connect } from 'react-redux';

import createForm from 'containers/Form/createForm';

import EmailField from 'containers/Form/components/EmailField';
import PasswordField from 'containers/Form/components/PasswordField';
import Button from 'components/Button';
import FormElement from 'components/FormElement';


/*
 * LoginForm
 */
export class LoginForm extends React.Component {
  static propTypes = {
    fieldsTouched: React.PropTypes.object,
    errors: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
  }

  render() {
    const { errors, fieldsTouched, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
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
          <div className="col-xs-12">
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
            <Button type="submit">Log in</Button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm = createForm({ // eslint-disable-line no-class-assign
  id: 'login',
})(LoginForm);

export default connect(null)(LoginForm);
