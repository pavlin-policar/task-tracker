import React from 'react';

import styles from './styles.css';


/**
* TextField
*/
class TextField extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  state = {
    value: '',
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  getValue() {
    return this.state.value;
  }

  clear() {
    this.setState({ value: '' });
  }

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        type="text"
        className={styles.textField}
        placeholder={placeholder}
        onChange={this.onChange}
        value={value}
      />
    );
  }
}

export default TextField;
