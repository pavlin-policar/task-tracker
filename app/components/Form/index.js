import React from 'react';

import styles from './styles.css';


/**
* Form
*/
class Form extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form
        className={styles.form}
        onSubmit={this.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
