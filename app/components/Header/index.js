import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import withAuth from 'containers/Authentication/withAuth';

import styles from './styles.css';


const guestLinks = (
  <div>
    <Link to="/login" className={styles.link}><FormattedMessage {...messages.login} /></Link>
    <Link to="/register" className={styles.link}><FormattedMessage {...messages.register} /></Link>
  </div>
);

const userLinks = (
  <div>
    <Link to="/logout" className={styles.link}><FormattedMessage {...messages.logout} /></Link>
  </div>
);

/**
* Header
*/
const Header = ({ isLoggedIn }) => (
  <header className={classNames('container-fluid', styles.headerContainer)}>
    <div className={classNames('wrap', styles.header)}>
      <h1 className={styles.logo}>TaskTracker</h1>
      {isLoggedIn ? userLinks : guestLinks}
    </div>
  </header>
);

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
};

export default withAuth(Header);
