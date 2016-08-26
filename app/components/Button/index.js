import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';


/**
* Button
*/
const Button = ({ children, className, ...rest }) => (
  <button className={classNames(styles.button, className)} {...rest}>
    {children || 'Button'}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]),
  className: React.PropTypes.string,
};

export default Button;
