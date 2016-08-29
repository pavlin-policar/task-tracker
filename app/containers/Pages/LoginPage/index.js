import React from 'react';
import { FormattedMessage } from 'react-intl';

import LoginForm from 'containers/Forms/LoginForm';

import messages from './messages';


/**
* LoginPage
*/
const LoginPage = () => (
  <div className="row">
    <div className="col-xs-12 center">
      <h1><FormattedMessage {...messages.heading} /></h1>
      <p><FormattedMessage {...messages.welcomeText} /></p>
    </div>
    <div className="col-md-4 col-md-offset-4 center">
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
