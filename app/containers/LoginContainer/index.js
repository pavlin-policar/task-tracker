import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import selectLoginContainer from './selectors';

import styles from './styles.css';


/*
 * LoginContainer
 */
export class LoginContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.loginContainer}>
      <Helmet
        title="LoginContainer"
        meta={[
          { name: 'description', content: 'Description of LoginContainer' },
        ]}
      />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectLoginContainer();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
