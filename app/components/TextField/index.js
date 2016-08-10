import React from 'react';

import styles from './styles.css';


/**
* TextField
*/
class TextField extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
    onKeyUp: React.PropTypes.func,
    autoFocus: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  }

  state = {
    value: this.props.value || '',
  }

  /**
   * Get the value of the textfield.
   *
   * @return {string} The value of the textfield.
   */
  getValue() {
    return this.state.value.trim();
  }

  /**
   * Clear the textfield of any text.
   */
  clear() {
    this.setState({ value: '' });
  }

  render() {
    const { className } = this.props;

    const elementClassName = [styles.textField];
    className && elementClassName.push(className); // eslint-disable-line no-unused-expressions

    return (
      <input
        type="text"
        className={elementClassName.join(' ')}
        value={this.state.value}
        onChange={(e) => { this.setState({ value: e.target.value }); }}
        onKeyUp={this.props.onKeyUp || (() => {})}
        autoFocus={this.props.autoFocus || false}
        disabled={this.props.disabled || false}
      />
    );
  }
}

export default TextField;
