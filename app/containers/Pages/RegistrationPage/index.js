import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import RegistrationForm from 'containers/Forms/RegistrationForm';

import messages from './messages';
import styles from './styles.css';


const form = <RegistrationForm />;
const successMessage = (
  <div>
    <h2>Registration complete!</h2>
    <p>You have completed registration.</p>
    <Link to="/login">Login</Link>
    <Link to="/register">Back</Link>
  </div>
);

const RegistrationPage = ({ location }) => (
  <div className="row">
    <div className="col-xs-12 center">
      <h1><FormattedMessage {...messages.mainHeading} /></h1>
    </div>
    <div className={classNames('col-xs-12', 'col-md-6', 'center', styles.descriptionBlock)}>
      <h2><FormattedMessage {...messages.neverForgetHeading} /></h2>
      <p><FormattedMessage {...messages.neverForgetText} /></p>

      <h2><FormattedMessage {...messages.takeItWithYouHeading} /></h2>
      <p><FormattedMessage {...messages.takeItWithYouText} /></p>
    </div>
    <div className="col-xs-12 col-md-6">
      {location.query.success ? successMessage : form}
    </div>
  </div>
);

RegistrationPage.propTypes = {
  location: React.PropTypes.object.isRequired,
};

export default RegistrationPage;
