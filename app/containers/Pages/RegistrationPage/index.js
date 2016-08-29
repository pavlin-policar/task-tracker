import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import RegistrationForm from 'containers/Forms/RegistrationForm';

import messages from './messages';
import styles from './styles.css';


const RegistrationPage = () => (
  <div className="row">
    <div className="col-xs-12 center">
      <h1><FormattedMessage {...messages.mainHeading} /></h1>
    </div>
    <div className={classNames('col-md-6', 'center', styles.descriptionBlock)}>
      <h2><FormattedMessage {...messages.neverForgetHeading} /></h2>
      <p><FormattedMessage {...messages.neverForgetText} /></p>

      <h2><FormattedMessage {...messages.takeItWithYouHeading} /></h2>
      <p><FormattedMessage {...messages.takeItWithYouText} /></p>
    </div>
    <div className="col-md-6">
      <RegistrationForm />
    </div>
  </div>
);

export default RegistrationPage;
