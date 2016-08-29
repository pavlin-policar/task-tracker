import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import styles from './styles.css';


/**
* Header
*/
const Header = () => (
  <header className={classNames('container-fluid', styles.headerContainer)}>
    <div className={classNames('wrap', styles.header)}>
      <h1 className={styles.logo}>TaskTracker</h1>
      <div>
        <Link to="/login" className={styles.link}><FormattedMessage {...messages.login} /></Link>
        <Link to="/register" className={styles.link}><FormattedMessage {...messages.register} /></Link>
      </div>
    </div>
  </header>
);

export default Header;
