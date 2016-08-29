import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';


/**
* Footer
*/
const Footer = () => (
  <div className={classNames('container-fluid', styles.footerContainer)}>
    <footer className={styles.footer}>
      <span>&copy; Pavlin Poličar</span>
    </footer>
  </div>
);

export default Footer;
