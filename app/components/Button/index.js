import React from 'react';

import styles from './styles.css';


/**
* Button
*/
const Button = ({ children, ...rest }) => (
  <button className={styles.button} {...rest}>
    {children || 'Button'}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]),
};

export default Button;
