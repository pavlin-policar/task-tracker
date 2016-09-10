import React from 'react';
import { createForm } from '@policar/react-redux-form';
import { withRouter } from 'react-router';

import { login } from './actions';

import EmailField from 'components/Form/EmailField';
import PasswordField from 'components/Form/PasswordField';
import Button from 'components/Button';
import FormElement from 'components/FormElement';


/*
 * LoginForm
 */
export class LoginForm extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
  }

  onSubmitSuccess() {
    this.props.router.push('/');
    this.props.clear();
  }

  onSubmitFailure() {
    this.props.clear(['password']);
  }

  render() {
    const { errors, fields, handleSubmit } = this.props;
    const { onSubmitSuccess, onSubmitFailure } = this;

    const formError = (
      <div className="row">
        <div className="col-xs-12">
          <p>{errors.get('form')}</p>
        </div>
      </div>
    );

    return (
      <form onSubmit={handleSubmit(login, [onSubmitSuccess, onSubmitFailure])}>
        {errors.get('form').isEmpty() ? null : formError}
        <div className="row">
          <div className="col-xs-12">
            <FormElement
              errors={errors.get('email')}
              touched={fields.getIn(['email', 'touched'])}
              type={EmailField}
              name="email"
              placeholder="Email"
              validate="required"
            />
          </div>
          <div className="col-xs-12">
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
})(withRouter(LoginForm));

export default LoginForm;
