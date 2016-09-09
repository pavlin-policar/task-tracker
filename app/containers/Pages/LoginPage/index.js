import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import LoginForm from 'containers/Forms/LoginForm';

import messages from './messages';


/**
* LoginPage
*/
const LoginPage = () => (
  <div className="row">
    <div className="col-xs-12 center">
      <h1><FormattedMessage {...messages.heading} /></h1>
    </div>
    <div className={classNames('col-xs-12', 'col-md-6', 'center')}>
      <p>This really needs some better text.</p>
    </div>
    <div className="col-xs-12 col-md-6 center">
      <p><FormattedMessage {...messages.welcomeText} /></p>
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;
