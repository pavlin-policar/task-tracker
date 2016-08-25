import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import selectLoginContainer from './selectors';
import { login } from './actions';

import TextField from 'components/Form/TextField';

import styles from './styles.css';


/*
 * Authentication
 */
export class Authentication extends React.Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.usernameField.getValue();
    const password = this.passwordField.getValue();

    this.props.login({ username, password });
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

export default connect(mapStateToProps, { login })(Authentication);
