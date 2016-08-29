import React from 'react';
import { connect } from 'react-redux';


/*
 * Authentication
 */
export class Authentication extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    login: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>Should you be here?</div>
    );
  }
}

export default connect(null)(Authentication);
