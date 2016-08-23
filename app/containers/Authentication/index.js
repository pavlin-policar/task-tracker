import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import selectLoginContainer from './selectors';

import TextField from 'components/TextField';

import styles from './styles.css';


/*
 * Authentication
 */
export class Authentication extends React.Component {
  static propTypes = {
    onLogin: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.usernameField.getValue();
    const password = this.passwordField.getValue();

    this.props.onLogin({ username, password });
    this.passwordField.clear();
  }

  render() {
    return (
      <form className={styles.loginContainer} onSubmit={this.handleSubmit}>
        <FormattedMessage {...messages.header} />
        <TextField
          placeholder="email or username"
          ref={(c) => { this.usernameField = c; }}
        />
        <TextField
          placeholder="password"
          ref={(c) => { this.passwordField = c; }}
        />
      </form>
    );
  }
}

const mapStateToProps = selectLoginContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
